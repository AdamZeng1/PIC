import React from 'react';
import {Button, Card} from 'antd';
import classes from './Comment.module.css';
import {withRouter} from 'react-router-dom';
import UserAvatar from '../../User/UserAvatar';
import UpdateComment from '../../Update/UpdateComment/UpdateComment';

var moment = require('moment');

const Styles = {
  cardStyle: {
    marginBottom: "16px",
  }
}

const comment = props => {
  const {commentator, type, image_url, emoji, updateAt, postId, _id} = props.commentData;
  const title = <UserAvatar owner={commentator} type="postHeader"/>
  let content = null;
  if (type === "image"){
    content =  <img src={image_url} className={classes.CommentImage} />

  }
  if (type === "emoji"){
    content = emoji.map( emo => {
      return emo.native
    })
  }
  let updateBtn = null;
  let firstLevelCommentID = null;
  if(props.commentData.commentId._id) {
    firstLevelCommentID = props.commentData.commentId._id;
  }
  if (props.extra && commentator._id === localStorage.UserID) {
    updateBtn = (
      <div>
        <Button type="link" size="small" onClick={()=>props.clicked(postId)}>
          View Post
        </Button>
        <UpdateComment 
          level={props.level} 
          postID={postId._id} 
          commentID={_id} 
          firstLevelCommentID={firstLevelCommentID}/>
      </div>)
  }
  return (
    <Card 
      title={title}
      style={Styles.cardStyle}
      extra={updateBtn}
    >
      {content}
      <p>{"Last Update: " + moment(updateAt).format("YYYY-MM-DD hh:mm:ss")}</p>

      {props.children}
    </Card>
  )
}

export default withRouter(comment);