import React from 'react';
import AlienLogo from '../../assets/images/logo-alien.png';
import classes from './Logo.module.css'

const logo = (props) => {
  return(
    <div className={classes.Logo}>
      <img src={AlienLogo}  alt="LogoImage"/>
    </div>
  )
}

export default logo;