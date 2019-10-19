import React, {Component} from 'react';
import { Form, Icon, Input, Button, Modal, message} from 'antd';
import axios from '../../axios-pic';
import './ForgotPassword.css';

/* 
  The Form part code is from the antd documentaion
  Link: https://ant.design/components/form/
  This part will send user's email and username to backend.
*/

class NormalLoginForm extends Component {

  submitUserData = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values);
      if (!err) {
        axios.post('/user/forgetPassword',values)
        .then(res => {
          message.success(res.data.message + ". Please change the password in 5 minutes.", 10)
          if(res.data.success === true){
           this.props.changed(values.username);
          }
        })
        .catch(err => {
          console.log(err.response)
          if(err.response) {
            message.error(err.response.data.message);
          }
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <Form onSubmit={this.submitUserData} className="forgotPassword-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' },
          {pattern: /[0-9a-zA-Z.-]*@[0-9a-zA-Z.]*\.[a-z]+/, message: 'Please input correct Email address!'}],
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="email"
              placeholder="Email"
            />,
          )} 
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="forgotPassword-form-button"
            disabled={this.props.disableBtn}>
            Get Code
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_forgotPassword' })(NormalLoginForm);


export default WrappedNormalLoginForm;