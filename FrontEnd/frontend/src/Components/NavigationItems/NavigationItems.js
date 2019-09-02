import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';
import NewPost from '../NewPost/NewPost';
import UploadImg from '../Upload/Upload';
// import axios from 'axios'
const navigationItems = () => {
  //Is the user Logined?
  console.log(document.cookie==='')
  if (document.cookie!=''){
    var cookie = document.cookie
    const username = cookie.split(';')[0].split('=')[1]
    console.log(username)
    return(<ul className={classes.NavigationItems}>
        <li className={classes.Upload}><NewPost /></li>
        <NavigationItem link='/' >Home</NavigationItem>
        <NavigationItem link={'/user/'+username} >{username}</NavigationItem>
        <NavigationItem>Log out</NavigationItem>
      </ul>
    )
  }else{
    return(
      <ul className={classes.NavigationItems}>
        <li className={classes.Upload}><NewPost /></li>
        <NavigationItem link='/' >Home</NavigationItem>
        <NavigationItem link='/Login' >Login</NavigationItem>
        <NavigationItem link='/Register' >Register</NavigationItem>
      </ul>
    )
  }

}

export default navigationItems;
