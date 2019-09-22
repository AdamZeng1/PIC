import React from 'react';
import {Card, Avatar } from 'antd';
import classes from './PostItem.module.css';

const Styles = {
  headStyle: {
    height: "60px",
  },
  cardStyle: {
    width: "100%",
    marginBottom: "60px",
    borderRadius: "5px",
  }
}

const postItem = (props) => {
  const header = (
    <div>
      <Avatar>U</Avatar>
      <span> User Name</span>
    </div>)
  const Image = <img
                  src={props.post.image_url[0]}
                  alt={props.post.image_url[0]}
                  className={classes.Image}
                />
  return(
      <Card
      title={header}
      loading={props.loading}
      hoverable={true}
      onClick={() => props.clicked(props.post)}
      headStyle={Styles.headStyle}
      style={Styles.cardStyle}
      cover={Image}
      >
      <h3>{props.post.title}</h3>
      <p>{props.post.created_at}</p>
      </Card>
  )
}

export default postItem;
