import React, {Component} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import axios from '../../axios-pic';

import './Login.css';

class NormalLoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const self = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post('/user/login',values)
        .then(res => {
          console.log(res);
          const token = res.data.token;
          localStorage.Token = token;
          console.log(localStorage.Token);
          document.cookie = "user="+res.data.name; // set a cookie
          window.location.href = 'http://localhost:3000/'//redirect to home page to refresh the Navigation
        })
        .catch(err => {
          console.error(err);
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="Form">
      <Form onSubmit={this.handleSubmit} className="login-form">
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
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
        </Form.Item>
      </Form>
      </div>

    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);


export default WrappedNormalLoginForm;
