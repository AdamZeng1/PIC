import React, {Component} from 'react';
import Toolbar from '../../Components/Toolbar/Toolbar';
import classes from './Layout.module.css';
import {withRouter} from 'react-router-dom';
//import ButtonSet from '../../Components/ButtonSet/ButtonSet';
import {Layout, Col, Row, message} from 'antd';
import Logo from '../../Components/Logo/Logo'
import Trending from '../PopularContent/PopularContent';

const { Header, Content } = Layout;

class CustomizedLayout extends Component{
  state ={
    login: false
  }
  UNSAFE_componentWillMount(){
    const token = localStorage.Token
    console.log(token)
    if (token){
      var username = document.cookie.split(';')[0].split('=')[1]
      this.setState({login: username})
    }
  }
  logOutHandler = () => {
    localStorage.removeItem("Token");
    console.log("TOKEN CLEAR!");
    this.setState({login:false});
    document.cookie=''
    this.props.history.push("/");
  }
  loginHandler = () => {
    var username = document.cookie.split(';')[0].split('=')[1]
    this.setState({login: username})
    this.props.history.push("/");
    message.info("Successfully logged in")
    // window.location.href = 'http://localhost:3000/'
  }
  render() {
    return(
      <Layout className={classes.Layout}>
        <Header className={classes.Header} theme="light">
          <Logo/>
          <Toolbar loginState={this.state.login} 
                  logout={this.logOutHandler} 
                  login={this.loginHandler}/>
        </Header>
        <Content className={classes.Content}>
          <Row gutter={32} justify="center">
            <Col span={14} className={classes.PostWrapper}>
              {this.props.children}
            </Col>
            <Col span={10} className={classes.TrendWrapper}>
              <Trending />
            </Col>
          </Row>
            {/* <ButtonSet></ButtonSet> */}
        </Content>         
      </Layout>
    )
  }
}

export default withRouter(CustomizedLayout);
