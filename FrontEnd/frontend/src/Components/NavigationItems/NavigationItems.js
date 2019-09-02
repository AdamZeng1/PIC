import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';
import NewPost from '../NewPost/NewPost';
import UploadImg from '../Upload/Upload';

const navigationItems = () => {
  return(
    <ul className={classes.NavigationItems}>
      <li className={classes.Upload}><NewPost /></li>
      <NavigationItem link='/' >Home</NavigationItem>
      <NavigationItem link='/Login' >Login</NavigationItem>
      <NavigationItem link='/Register' >Register</NavigationItem>
    </ul>
  )
}

export default navigationItems;
