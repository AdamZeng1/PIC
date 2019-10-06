import React, {Component} from 'react';
import Toolbar from '../../Components/Toolbar/Toolbar';
import classes from './Layout.module.css';
import {withRouter} from 'react-router-dom';
//import ButtonSet from '../../Components/ButtonSet/ButtonSet';
import {Layout} from 'antd';
import Logo from '../../Components/Logo/Logo'
import Trending from '../../Components/Popular/PopularPost/PopularPost';

const { Header, Content } = Layout;

class CustomizedLayout extends Component{
  state ={
    login: false
  }
  UNSAFE_componentWillMount(){
    const token = localStorage.Token
    if (token){
      var username = localStorage.Username;
      this.setState({login: username})
    }
  }
  logOutHandler = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("Username")
    localStorage.removeItem("UserID")
    // console.log("storage CLEAR!");
    this.setState({login:false});
    this.props.history.go(0);
  }
  loginHandler = () => {
    this.setState({login: true})
    this.props.history.go(0);
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
