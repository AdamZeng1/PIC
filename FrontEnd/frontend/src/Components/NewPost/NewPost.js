import React, {Component} from 'react';
import { Icon, Modal } from 'antd';
import UploadImg from '../Upload/Upload';

class NewPost extends Component {

  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render(){
    return(
      <div>
        <Icon type="upload" onClick={this.showModal}/>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
         <UploadImg />
        </Modal>
      </div>
    )
  }
}

export default NewPost;