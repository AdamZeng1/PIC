import React from 'react';
import {Button} from 'antd';
import './Button.css';

const button = props => {
  return <Button 
          className={props.class} 
          onClick={props.click}
          disabled={props.disable}
          loading={props.load}
          type={props.type}>
            {props.children}
          </Button>
}

export default button;