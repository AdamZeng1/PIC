import React, {Component, Fragment} from 'react';
import {Button} from 'antd';
import axios from '../../../axios-pic';
import Comment from '../Comment/Comment';
import classes from './SecondComment.module.css';

class SecondComment extends Component {
  state = {
    secondaryComments: null,
    commentsShowed: false,
  }
  renderSecondaryComments = commentID => {
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
  }

  hideSecondaryComments = () => {
    this.setState({commentsShowed: false})
  }
  render() {
    let secondComments = null;
    if (this.state.secondaryComments){
      secondComments = this.state.secondaryComments.map( secondComment => {
        return <Comment key={secondComment._id} commentData={secondComment}/>
      })
    }
    const showBtn = <Button
        type="link"
        size="small" 
        onClick={()=>this.renderSecondaryComments(this.props.commentID)}>
        show comments
      </Button>
    
    const hideBtn = <Button 
        type="link"
        size="small" 
        onClick={()=>this.hideSecondaryComments()}>
        hide comments
      </Button>

    return(
      <Fragment>
        <div className={classes.BtnsWrapper}>
          {this.state.commentsShowed ? hideBtn : showBtn}
        </div>
        <div className={classes.SecondComments}>
          {this.state.commentsShowed ? secondComments : null}
        </div>
      </Fragment>
    )
  }
}

export default SecondComment;