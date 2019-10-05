import React, {Component} from 'react';
import { Icon, Modal, Tooltip} from 'antd';
import classes from './NewPost.module.css';
import CreateItem from '../CreateItem/CreateItem';
import Upload from '../CreateItem/Upload/Upload';


class NewPost extends Component {

  state = {
    visible: false,
   };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
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
          {/* <CreateItem api={postAPI}/> */}
        </Modal>
      </div>
    )
  }
}

export default NewPost;
