import React, {Component} from 'react';
import { Icon, Modal, Tooltip} from 'antd';
import Upload from '../../CreateItem/Upload/Upload';


class NewPost extends Component {

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

  render(){
    const postAPI = "/post/";
    return(
      <div>
        <Tooltip placement="bottom" title="Create Post">
          <Icon type="edit" onClick={this.showModal}/>
        </Tooltip>
        <Modal
          centered
          title="Create a new post"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        > 
          <Upload api={postAPI} close={this.handleCancel}/>
        </Modal>
      </div>
    )
  }
}

export default NewPost;
