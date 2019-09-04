import React, {Component, Fragment} from 'react';
import Toolbar from '../../Components/Toolbar/Toolbar';
import classes from './Layout.module.css';
import {withRouter} from 'react-router-dom';

class Layout extends Component{
  state ={
    login: false
  }
  componentWillMount(){
    const token = localStorage.Token
    console.log(token)
    if (token){
      this.setState({login: true})
      console.log('IN')
    }
  }
  logOutHandler = () => {
    localStorage.removeItem("Token");
    console.log("TOKEN CLEAR!");
    this.setState({login:false});
    this.props.history.push("/");
  }
  loginHandler = () => {
    this.setState({login:true});
    this.props.history.push("/");
  }
  render() {
    return(
      <Fragment>
        <Toolbar loginState={this.state.login} logout={this.logOutHandler} login={this.loginHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Fragment>
    )
  }
}

export default withRouter(Layout);