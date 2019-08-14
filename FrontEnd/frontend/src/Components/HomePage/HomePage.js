import React, {Component} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import axios from 'axios';
import PostList from '../Post/PostList'

class HomePage extends Component {
  // Mounted = e => {
  //   //Load data
  // };

  render() {
    return(
      <div>
        <h2>Home</h2>
        <PostList></PostList>
      </div>
    );
  }
}


export default HomePage;
