import React from 'react';
import {Avatar} from 'antd';
import classes from './UserAvatar.module.css';
import {Link} from 'react-router-dom';

const userAvatar = (props) => {
  const username = localStorage.Username;
  // console.log(props.owner);
  if(props.type === "postHeader"){
    return (
      <Link to={{pathname:"/user/"+ props.owner.name + "/" + props.owner._id, 
                 state:{id: props.owner._id, name: props.owner.name}}}>
        <div className={classes.PostHeader}>
          <Avatar icon="user" style={{ backgroundColor: 'mediumseagreen' }}/>
          <h3>{props.owner.name}</h3>
        </div>
      </Link>
    )
  }
  if (props.type === "userpage"){
    return (
      <div className={classes.UserAvatarLarge}>    
        <Avatar size={64} icon="user" style={{ backgroundColor: 'mediumseagreen' }}/>
        <h1>{props.owner.name}</h1>       
      </div>
    )
  }
  if(localStorage.Username){
    return (
      <Link to={{pathname:"/user/"+ localStorage.Username + "/" + localStorage.UserID, 
                state:{id: localStorage.UserID, name: localStorage.Username}}}>
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