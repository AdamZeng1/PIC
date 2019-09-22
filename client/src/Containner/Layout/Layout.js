import React, {Component, Fragment} from 'react';
import Toolbar from '../../Components/Toolbar/Toolbar';
import classes from './Layout.module.css';
import {withRouter} from 'react-router-dom';
import ButtonSet from '../../Components/ButtonSet/ButtonSet'

class Layout extends Component{
  state ={
    login: false
  }
  componentWillMount(){
    const token = localStorage.Token
    console.log(token)
    if (token){
      var username = document.cookie.split(';')[0].split('=')[1]
      this.setState({login: username})
      console.log('IN')
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
    // window.location.href = 'http://localhost:3000/'
  }
  render() {
    return(
      <Fragment>
        <Toolbar loginState={this.state.login} logout={this.logOutHandler} login={this.loginHandler}/>
        <ButtonSet></ButtonSet>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Fragment>
    )
  }
}

export default withRouter(Layout);
