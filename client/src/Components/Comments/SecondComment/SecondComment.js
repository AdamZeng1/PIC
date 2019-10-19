import React, {Component, Fragment} from 'react';
import {Button} from 'antd';
import axios from '../../../axios-pic';
import Comment from '../Comment/Comment';
import classes from './SecondComment.module.css';

/*
  This component get all secondary level comments of any comment,
  and render the data with Comment component.
  The secondary comments will show or hide by clicking the button.
 */

class SecondComment extends Component {
  state = {
    secondaryComments: null,
    commentsShowed: false,
    currentID: null,
  }
  renderSecondaryComments = commentID => {
    if(commentID !== this.state.currentID){
      axios.get("/posts/" + this.props.postID + "/comments/" + commentID + "/comments/")
      .then(res => {
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