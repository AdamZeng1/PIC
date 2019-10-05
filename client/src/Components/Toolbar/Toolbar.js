import React from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import NewPost from '../NewPost/NewPost';
import Logout from '../Logout/Logout';
import Login from '../Login/Login';
import Register from '../Register/Register';
import {Icon} from 'antd';
import {Link} from 'react-router-dom';

const toolbar = (props) => {

    const guestUI = (
      <div className={classes.GuestUI}>
        <Login login={props.login}/>
        <Register />
      </div>
    );

    const userUI = (
      <div className={classes.UserUI}>
        <div className={classes.LoggedIn}><NewPost /></div>
        <div className={classes.LoggedIn}>
          <Link to={"/user/" + localStorage.Username}>
            <Icon type="user" style={{color: "dimgray"}} />
          </Link>
        </div>
        <div className={classes.LoggedIn}><Logout click={props.logout}/></div>
      </div>
    )

    return(
      <div className={classes.Toolbar}>
          <nav>
            <NavigationItems />
          </nav>
          {props.loginState !== false ? userUI : guestUI}
      </div>
    )
}

export default toolbar;
