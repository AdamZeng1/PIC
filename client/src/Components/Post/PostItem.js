import React from 'react';
import {Card} from 'antd';
import classes from './PostItem.module.css';
import UserAvatar from '../User/UserAvatar';
import UpdatePost from '../Update/UpdatePost/UpdatePost';


const moment = require('moment');

const Styles = {
  headStyle: {
    height: "64px",
  },
  cardStyle: {
    width: "100%",
    marginBottom: "32px",
    borderRadius: "5px",
  },
  bodyStyle: {
    display: "none",
  }
};

const postItem = (props) => {
  const post = props.post;
  let numberOfComments = null;
  let post_owner = null;
  let updateBtn = null;
  if(props.type === 'mainpage'){
    post_owner = post.post_owner;
  }
  if(props.type === "popular"){
    numberOfComments = post.numberOfComments[0].count;
    post_owner = post.post_owner[0];
  }
  if(props.extra && post.post_owner._id === localStorage.UserID) {
    updateBtn = <UpdatePost postID={post._id}/>
  }
  const header = (
    <div className={classes.Header}>
        <UserAvatar type="postHeader" owner={post_owner}/>
        <p>{moment(post.created_at).fromNow()}</p>
        {numberOfComments ? <p>{" " + numberOfComments + " comments"}</p> : null}
    </div>);
  const Image = <img
                  src={post.image_url[0]}
                  alt={post.image_url[0]}
                  className={classes.Image}
                  onClick={() => props.clicked(props.post)}
                />;
  return(
      <Card
      title={header}
      loading={props.loading}
      hoverable={true}
      headStyle={Styles.headStyle}
      style={Styles.cardStyle}
      bodyStyle={Styles.bodyStyle}
      cover={Image}
      extra={updateBtn}
      >
        {props.children}
      </Card>
  )
};

export default postItem;
