import React from 'react';
import {Button, Card} from 'antd';
import classes from './Comment.module.css';
import {withRouter} from 'react-router-dom';
import UserAvatar from '../../Users/UserAvatar/UserAvatar';
import UpdateComment from '../UpdateComment/UpdateComment';

var moment = require('moment');

const Styles = {
  cardStyle: {
    marginBottom: "16px",
  }
}

/* The comment component first check the type of the comment: image or emoji, then render it.
 * The default level of a comment is "comment to post",
 * if the level is "second" -> "comment to comment",
 * different values will be passed into the update comment button.
 * The extraBtn property is used in user page that allows user to view the original post.
 */

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
  let updateBtn = <UpdateComment 
                    level={props.level} 
                    postID={postId._id} 
                    commentID={_id} />;
  if (props.level === "second") {
    updateBtn = <UpdateComment 
          level={props.level} 
          postID={postId._id} 
          commentID={_id} 
          firstLevelCommentID={props.commentData.commentId._id}/>
      
  }
  let extraBtn = null; 
  if (props.extra && commentator._id === localStorage.UserID) {
    extraBtn = (
      <div>
      <Button type="link" size="small" onClick={()=>props.clicked(postId)}>
        View Post
      </Button>
      {updateBtn}
    </div>)
  }
  if (props.extra && commentator._id !== localStorage.UserID) {
    extraBtn =  <Button type="link" size="small" onClick={()=>props.clicked(postId)}>
                  View Post
                </Button>
  }
  return (
    <Card 
      title={title}
      style={Styles.cardStyle}
      extra={extraBtn}
    >
      {content}
      <p>{"Last Update: " + moment(updateAt).format("YYYY-MM-DD hh:mm:ss")}</p>

      {props.children}
    </Card>
  )
}

export default withRouter(comment);