import React, {Component} from 'react';
import { Icon, Modal, Tooltip} from 'antd';
import classes from './NewPost.module.css';
import CreateItem from '../CreateItem/CreateItem';


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
          <CreateItem api={postAPI}/>
        </Modal>
      </div>
    )
  }
}

export default NewPost;
