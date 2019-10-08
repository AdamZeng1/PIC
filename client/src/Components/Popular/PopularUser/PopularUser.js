import React, {Component} from 'react';
import axios from '../../../axios-pic';
import { List, Spin, Avatar} from 'antd';
import classes from './PopularUser.module.css';
import {Link} from 'react-router-dom';

class PopularUser extends Component {
  state = {
    userData: null,
  };
  UNSAFE_componentWillMount(){
    axios.get("/user/popular/users")
      .then( res => {
        this.setState({userData: res.data})
      })
      .catch( err => {
        console.log( err.response );
      })
  }
  render() {
    let content = <Spin />;
    if (this.state.userData) {
      content = <List
      size='small'
      bordered
      header={<h3>Popular Users</h3>}
      dataSource={this.state.userData}
      renderItem={item => {
        return(
        <List.Item >
          <Link to={{pathname:"/user/"+item.user[0].name + "/" + item.user[0]._id, 
                     state:{id: item.user[0]._id, name: item.user[0].name}}}>
          <List.Item.Meta 
            avatar={<Avatar icon="user" style={{ backgroundColor: 'mediumseagreen' }}/>}
            title={item.user[0].name}
            description={item.numberOfPosts + " posts"}/>
          </Link>
        </List.Item>)
      }} />
    }
    return(
      <div className={classes.PopularUserWrapper}>
        {content}
      </div>
    )
  }
}

export default PopularUser;
