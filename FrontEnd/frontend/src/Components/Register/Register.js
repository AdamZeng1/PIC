import React, {Component, Fragment} from 'react';
import { Form, Icon, Input, Button, Checkbox, Modal } from 'antd';
import axios from '../../axios-pic';
import './Register.css';

class NormalRegisterForm extends Component {
  state = {
    modal1Visible: false,
    modal2Visible: false,
  };

  setModal1Visible(modal1Visible) {
    this.setState({ modal1Visible });
  }

  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post('/user/register',values)
        .then(res => {
          console.log(res);
          if(res.data.success){
            this.setModal2Visible(false)
            alert(res.data.message);
          }
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
      <Fragment>
      <Button shape="round" ghost style={{margin:"0 10px", fontWeight:"bold"}}
        onClick={() => this.setModal2Visible(true)}>
          SIGN UP
      </Button>
      <Modal 
        centered
        visible={this.state.modal2Visible}
        onOk={() => this.setModal2Visible(false)}
        onCancel={() => this.setModal2Visible(false)}
        footer={null}>
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
          {/* {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="register-form-forgot" href="">
            Forgot password
          </a> */}
          <Button type="primary" htmlType="submit" className="register-form-button">
            SIGN UP
          </Button>
          {/* Or <a href="">register now!</a> */}
        </Form.Item>
      </Form>
      </div>
      </Modal>
      </Fragment>

    );
  }
}

const WrappedNormalRegisterForm = Form.create({ name: 'normal_register' })(NormalRegisterForm);

export default WrappedNormalRegisterForm;
