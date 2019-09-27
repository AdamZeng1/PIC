import React from 'react';
import {Comment, Avatar} from 'antd';
import classes from './Comment.module.css';
import {withRouter} from 'react-router-dom';

const comment = props => {
  const {commentator, type, image_url, emoji, _id} = props.commentData;
  return <Comment
          key={_id}
          author={commentator.name}
          avatar={<Avatar>{commentator.name}</Avatar>} 
          content={<img src={image_url} className={classes.CommentImage}/>}
          datatime={<span>Add "moment" here</span>}/>
}

export default withRouter(comment);