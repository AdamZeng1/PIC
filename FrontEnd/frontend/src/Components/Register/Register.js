import React, {Component} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import axios from 'axios';
import './Register.css';

class NormalRegisterForm extends Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post('http://localhost:4000/user/register',values)
        .then(res => {
          console.log(res)
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
      <Form onSubmit={this.handleSubmit} className="register-form">
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
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
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
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="register-form-forgot" href="">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="register-form-button">
            Register
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
      </div>

    );
  }
}

const WrappedNormalRegisterForm = Form.create({ name: 'normal_register' })(NormalRegisterForm);

export default WrappedNormalRegisterForm;
