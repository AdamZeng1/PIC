import React, {Component} from 'react';
import {Button} from 'antd';

class UpdatePost extends Component {
  updatePostHandler = () => {
    
  }
  render() {
    return(
      <Button type='linke' size='small' onClick={this.updatePostHandler}>
        Update
      </Button>
    )
  }
}