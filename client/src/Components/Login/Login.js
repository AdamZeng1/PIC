import React, {Component, Fragment} from 'react';
import { Form, Icon, Input, Button, Checkbox, Modal, message} from 'antd';
import axios from '../../axios-pic';
import './Login.css';
import {Link} from 'react-router-dom';

/* 
  The Form part code is from the antd documentaion
  Link: https://ant.design/components/form/
*/

class NormalLoginForm extends Component {
  state = {
    modal1Visible: false,
    modal2Visible: false,
  };

  setModal2Visible(modal2Visible) {
    this.props.form.resetFields();
    this.setState({ modal2Visible });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post('/user/login',values)
        .then(res => {
          console.log(res)
          if(res.data.success){
            message.success(res.data.message)                     
            const token = res.data.token.substr(7);
            localStorage.Token = token;
            localStorage.Username = res.data.name;
            localStorage.UserID = res.data.userId;
            this.setModal2Visible(false);
            this.props.login();
          }
        })
        .catch(err => {
          if(err.response) {
            message.error(err.response.data.message);
          }
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
      <Button shape="round" 
        className="LoginBtn"
        onClick={() => this.setModal2Visible(true)}>
          LOG IN
      </Button>
      <Modal
        centered
        visible={this.state.modal2Visible}
        onOk={() => this.setModal2Visible(false)}
        onCancel={() => this.setModal2Visible(false)}
        footer={null}>
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
          <Link className="login-form-forgot" to="/forgot_password">
            Forgot password
          </Link>
          <Button type="primary" htmlType="submit" className="login-form-button">
            LOG IN
          </Button>
        </Form.Item>
      </Form>
      </div>
      </Modal>
      </Fragment>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);


export default WrappedNormalLoginForm;
