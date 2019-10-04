import React, {Component} from 'react';
import Toolbar from '../../Components/Toolbar/Toolbar';
import classes from './Layout.module.css';
import {withRouter} from 'react-router-dom';
//import ButtonSet from '../../Components/ButtonSet/ButtonSet';
import {Layout, Col, Row, message} from 'antd';
import Logo from '../../Components/Logo/Logo'
import Trending from '../../Components/Popular/PopularPost/PopularPost';

const { Header, Content } = Layout;

class CustomizedLayout extends Component{
  state ={
    login: false
  }
  UNSAFE_componentWillMount(){
    const token = localStorage.Token
    console.log(token)
    if (token){
      var username = localStorage.Username;
      this.setState({login: username})
    }
  }
  logOutHandler = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("Username")
    console.log("TOKEN CLEAR!");
    this.setState({login:false});
    this.props.history.push("/");
  }
  loginHandler = () => {
    var username = document.cookie.split(';')[0].split('=')[1]
    this.setState({login: username})
    this.props.history.push("/");
    message.success("Successfully logged in")
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
          {this.props.children}
            {/* <ButtonSet></ButtonSet> */}
        </Content>         
      </Layout>
    )
  }
}

export default withRouter(CustomizedLayout);
