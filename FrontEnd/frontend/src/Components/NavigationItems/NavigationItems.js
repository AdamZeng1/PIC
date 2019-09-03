import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = () => {

  return(
    <div className={classes.Wrapper}>
      <ul className={classes.NavigationItems}>
        <NavigationItem link='/' >Home</NavigationItem>
        <NavigationItem link='/popular' >Popular</NavigationItem>
        <NavigationItem link='/newest' >Newest</NavigationItem>
      </ul>
    </div> 
  )
}

export default navigationItems;
