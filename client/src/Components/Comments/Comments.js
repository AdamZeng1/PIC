import React, {Component} from 'react';
import classes from './Comments.module.css';
import axios from '../../axios-pic'
import Comment from './Comment/Comment';
import MakeComment from './MakeComment/MakeComment'
import {withRouter} from 'react-router-dom';
import {Button} from 'antd';

class Comments extends Component {
  state = {
    comments: null,
    currentID: null,
    secondaryComments: null,
    commentsShowed: false,
  }

  UNSAFE_componentWillMount(){
    axios.get("/posts/" + this.props.postID + "/comments/")
      .then( res => {
        console.log(res.data);
        this.setState({comments: res.data.comments})
      })
      .catch(err => console.log(err))
  }

  renderSecondaryComments = commentID => {
    if( commentID !== this.state.currentID){
    axios.get("/posts/" + this.props.postID + "/comments/" + commentID + "/comments/")
      .then(res => {
        console.log(res)
        this.setState({
          currentID: commentID,
          secondaryComments: res.data.secondComments,
          commentsShowed: true,
        })
      })
      .catch(err => {
        console.log(err.response)
      })
    }else{
      this.setState({commentsShowed: true})
    }
  }

  hideSecondaryComments = () => {
    this.setState({commentsShowed: false})
  }

  render(){
    const postID = this.props.match.params.postid;
    
    let secondComments = null;
    if (this.state.secondaryComments){
      secondComments = this.state.secondaryComments.map( secondComment => {
        return <Comment key={secondComment._id} commentData={secondComment}/>
      })
    }
    let comments = null;
    if (this.state.comments) {
      comments = this.state.comments.map( comment => {
        let showBtn = (
          <Button
            type="link"
            size="small" 
            onClick={()=>this.renderSecondaryComments(comment._id)}>
            show comments
          </Button>
        )
        let hideBtn = (
          <Button 
            type="link"
            size="small" 
            onClick={()=>this.hideSecondaryComments()}>
            hide comments
          </Button>
        )
        return (
          <Comment key={comment._id} commentData={comment}>
            <div className={classes.CommentFooter}>
              <span>{this.state.commentsShowed ? hideBtn : showBtn}</span>
              <MakeComment type="secondary" commentID={comment._id} postID={postID}/>
            </div>
            {this.state.commentsShowed ? secondComments : null}
          </Comment>
        )
      })
    }

    return(
      <div>
        {comments}
      </div>
      
    )
  }
}

export default withRouter(Comments);