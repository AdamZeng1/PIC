import React, {Component, Fragment} from 'react';
import { Form, Icon, Input, Button, Modal, message} from 'antd';
import axios from '../../axios-pic';
import './ForgotPassword.css';
import ChangePasswordFrom from './FormPartTwo';
import UserDataForm from './FormPartOne';

/* 
  The Form part code is from the antd documentaion
  Link: https://ant.design/components/form/
*/

class ForgotPassword extends Component {
  state = {
    username: null,
    disableBtn: false,
  };
  stateChangeHandler = (name) => {
    this.setState({username: name, disableBtn: true}, () => {
      setTimeout(() => this.setState({disableBtn: false}), 300000);
    })
  }
  
  render() {
    return(
      <div className="Form">
        <UserDataForm disableBtn={this.state.disableBtn} changed={this.stateChangeHandler} />
        <ChangePasswordFrom username={this.state.username} {...this.props} />
      </div>
    )
  }
}

export default ForgotPassword;