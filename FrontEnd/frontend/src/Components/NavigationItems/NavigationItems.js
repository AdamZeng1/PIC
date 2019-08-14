import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = () => {
  return(
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/Login' >Login</NavigationItem>
      <NavigationItem link='/Register' >Register</NavigationItem>
    </ul>
  )
}

export default navigationItems;