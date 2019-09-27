import React from 'react';
import {Popover, Tag} from 'antd';
import classes from './MakeComment.module.css';
import CreateItem from '../../CreateItem/CreateItem';

const makeComment = (props) => {
    const {postID, commentID, type, pathname} = props;
    let commentAPI = "";
    if(type === "post" && postID){
      commentAPI = "/posts/" + postID + "/comments/";
    }
    if (type === "secondary" && commentID && pathname) {
      commentAPI = pathname + "/comments/" + commentID + "/comments/";
    }
    const content = <CreateItem api={commentAPI}/>
    return(
      <Popover
        content={content}
        placement="right"
        trigger="click"
      >
        <Tag color="magenta">Reply</Tag>
      </Popover>
    )
}

export default makeComment;
