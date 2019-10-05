import React from 'react';
import {Card} from 'antd';
import classes from './PostItem.module.css';
import UserAvatar from '../User/UserAvatar';

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
  if(props.type === 'mainpage'){
    post_owner = post.post_owner.name;
  }
  if(props.type === "popular"){
    numberOfComments = post.numberOfComments[0].count;
    post_owner = post.post_owner[0].name;
  }
  const header = (
    <div className={classes.Header}>
        <UserAvatar type="postHeader" name={post_owner}/>
        <p>{moment(post.created_at).fromNow()}</p>
        {numberOfComments ? <p>{" " + numberOfComments + " comments"}</p> : null}
    </div>);
  const Image = <img
                  src={post.image_url[0]}
                  alt={post.image_url[0]}
                  className={classes.Image}
                />;
  return(
      <Card
      title={header}
      loading={props.loading}
      hoverable={true}
      onClick={() => props.clicked(props.post)}
      headStyle={Styles.headStyle}
      style={Styles.cardStyle}
      bodyStyle={Styles.bodyStyle}
      cover={Image}
      >
      {/*<p>{moment(post.created_at).fromNow()}</p>*/}
      {/*<MakeComment type="post" postID={props.post._id}/>*/}
      </Card>
  )
};

export default postItem;
