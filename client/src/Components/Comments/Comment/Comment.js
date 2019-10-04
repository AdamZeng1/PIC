import React from 'react';
import {Comment, Avatar, Card} from 'antd';
import classes from './Comment.module.css';
import {withRouter} from 'react-router-dom';
import UserAvatar from '../../User/UserAvatar';

var moment = require('moment');

const Styles = {
  cardStyle: {
    marginBottom: "16px",
  }
}

const comment = props => {
  const {commentator, type, image_url, emoji, updateAt} = props.commentData;
  const title = <UserAvatar name={commentator.name} type="postHeader"/>
  let content = null;
  if (type === "image"){
    content =  <img src={image_url} className={classes.CommentImage}/>

  }
  if (type === "emoji"){
    content = emoji.map( emo => {
      return emo.native
    })
  }
  return (
    // <Comment
    //       key={_id}
    //       author={commentator.name}
    //       avatar={<Avatar>{commentator.name}</Avatar>} 
    //       content={<img src={image_url} className={classes.CommentImage}/>}
    //       datatime={<span>Add "moment" here</span>}/>
    <Card 
      title={title}
      style={Styles.cardStyle}
    >
      {content}
      <p>{"Last Update: " + moment(updateAt).format("YYYY-MM-DD hh:mm:ss")}</p>
      {props.children}
    </Card>
  )
}

export default withRouter(comment);