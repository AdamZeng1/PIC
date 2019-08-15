import React from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../Logo/Logo';


const toolbar = () => {
  return(
    <header className={classes.Toolbar}>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav>
        <NavigationItems/>
      </nav>
    </header>
  )
}

export default toolbar;
