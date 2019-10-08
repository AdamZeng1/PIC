import React, {Component} from 'react';
import { Form, Icon, Input, Button, Modal, message} from 'antd';
import axios from '../../axios-pic';
import './ForgotPassword.css';

/* 
  The Form part code is from the antd documentaion
  Link: https://ant.design/components/form/
*/

class NormalLoginForm extends Component {

  changePassword = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      values.username = this.props.username;
      console.log(values);
      if (!err && this.props.username) {
        if (values.password !== values.confirmPassword) {
          message.error("Passwords do not match")
          return false;
        }
        if (values.password === values.confirmPassword){
          values.username = this.props.username;
          axios.post('/user/verify/alterPassword',values)
          .then(res => {
            console.log(res);
            message.success(res.data.message);
            this.props.history.replace("/");
          })
          .catch(err => {
            console.log(err.response)
            if(err.response) {
              message.error(err.response.data.message);
            }
          })
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    
    return(
        <Form onSubmit={this.changePassword} className="forgotPassword-form">
          <Form.Item>
            {getFieldDecorator('verificationCode', {
              rules: [{ required: true, message: 'Please input verification code!' }],
            })(
              <Input
                prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="text"
                placeholder="Verification Code"
              />,
            )}
            
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your new Password!' },
              { pattern: /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Z]{1,})(?=.*[a-z]{1,}).*$/, 
                message: "The password should contain at least a uppercase letter, a lowercase letter and a number, and the length should between 6 and 16 characters."}
            ],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="New Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('confirmPassword', {
              rules: [{ required: true, message: 'Please confirm your Password!' },
              { pattern: /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Z]{1,})(?=.*[a-z]{1,}).*$/, message: ""}
            ],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Confirm Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="forgotPassword-form-button">
              SUBMIT
            </Button>
          </Form.Item>
      </Form>

    )
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_forgotPassword' })(NormalLoginForm);


export default WrappedNormalLoginForm;