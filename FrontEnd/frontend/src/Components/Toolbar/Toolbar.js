import React from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../Logo/Logo';
import NewPost from '../NewPost/NewPost';
import Logout from '../Logout/Logout';
import Login from '../Login/Login';
import Register from '../Register/Register';

const toolbar = (props) => {
 
    const guestUI = (
      <div className={classes.NavigationItems}>
        <Login login={props.login}/>
        <Register />
      </div>
    );

    const userUI = (
      <div className={classes.NavigationItems}>
        <div className={classes.LoggedIn}><NewPost /></div>
        <div className={classes.LoggedIn}><Logout click={props.logout}/></div>
      </div>
    )
    
    return(
      <header className={classes.Toolbar}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <div className={classes.Wrapper}>
          <nav>
            <NavigationItems />
          </nav>
          {props.loginState ? userUI : guestUI}
        </div>
      </header>
    )
}

export default toolbar;
