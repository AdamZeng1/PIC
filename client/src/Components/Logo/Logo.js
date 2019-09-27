import React from 'react';
import AlienLogo from '../../assets/images/logo-alien.png';
import classes from './Logo.module.css'
import {NavLink} from 'react-router-dom';

const logo = () => {
  return(
    <div className={classes.Logo}>
      <NavLink to="/" exact>
        <img src={AlienLogo}  alt="LogoImage"/>
      </NavLink>
    </div>
  )
}

export default logo;