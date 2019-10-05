import React, {Component} from 'react';
import classes from './Comments.module.css';
import axios from '../../axios-pic'
import Comment from './Comment/Comment';
import MakeComment from './MakeComment/MakeComment'
import {withRouter} from 'react-router-dom';
import {Button} from 'antd';
import SecondComment from './SecondComment/SecondComment';

class Comments extends Component {
  state = {
    comments: null,
  }

  UNSAFE_componentWillMount(){
    axios.get("/posts/" + this.props.postID + "/comments/")
      .then( res => {
        console.log(res.data);
        this.setState({comments: res.data.comments})
      })
      .catch(err => console.log(err))
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
        return (
          <Comment key={comment._id} commentData={comment}>
            <div className={classes.ReplyBtn}>
              <MakeComment type="secondary" commentID={comment._id} postID={postID}/>
            </div>
            <SecondComment commentID={comment._id} postID={postID}/>
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