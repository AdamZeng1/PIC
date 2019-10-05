import React from 'react';
import {Avatar} from 'antd';
import classes from './UserAvatar.module.css';
import {Link} from 'react-router-dom';

const userAvatar = (props) => {
  if(props.type === "postHeader"){
    return (
      <div className={classes.PostHeader}>
        <Avatar icon="user" style={{ backgroundColor: 'mediumseagreen' }}/>
        <h3>{props.name}</h3>
      </div>
    )
  }
  if(localStorage.Username){
    const username = localStorage.Username;
    return (
      <Link to={"/user/" + localStorage.Username}>
        <div className={classes.UserAvatar}>    
            <Avatar size='large' icon="user" style={{ backgroundColor: 'mediumseagreen' }}/>
            <h2>{username}</h2>       
        </div>
      </Link>
    )
  }
  return null;
}

export default userAvatar;