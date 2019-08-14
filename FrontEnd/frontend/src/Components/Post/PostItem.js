import React from 'react';
import {NavLink} from 'react-router-dom';

const navigation = (props) => {
  return(
    <div>
      <h2>{props.data.username}</h2>
      <img src={props.data.url}/>
      <p>{props.data.time}</p>
    </div>
  )
}

export default navigation;
