import React, {Component} from 'react';
import {Button, Modal} from 'antd';
import Upload from '../../CreateItem/Upload/Upload';

class UpdatePost extends Component {
  state = {
    visible: false,
   };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const postAPI = "/post/" + this.props.postID;
    return(
      <div>
        <Button type="link" size='small' onClick={this.showModal} style={{color: 'red'}}>
          Edit
        </Button>
        <Modal
          centered
          title="Edit Post"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        > 
          <Upload api={postAPI} close={this.handleCancel} method="patch"/>
        </Modal>
      </div>
    )
  }
}

export default UpdatePost;