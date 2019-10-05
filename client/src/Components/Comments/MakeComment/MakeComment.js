import React, {Component, Fragment} from 'react';
import {Modal, Icon, Button} from 'antd';
import classes from './MakeComment.module.css';
import CreateItem from '../../CreateItem/CreateItem';

class MakeComment extends Component {
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

  render () {
    const {postID, commentID, type} = this.props;
    let commentAPI = "";
    if(type === "post" && postID){
      commentAPI = "/posts/" + postID + "/comments/";
    }
    if (type === "secondary" && commentID && postID) {
      commentAPI = "/posts/" + postID + "/comments/" + commentID + "/comments/";
    }
    const content = <CreateItem api={commentAPI}/>
    return(
      <Fragment>
        <Button
          type="link"
          size="small"
          onClick={this.showModal}>
            Reply
        </Button>
        <Modal
          centered
          title="Make a Comment"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <CreateItem api={commentAPI} close={this.handleCancel}/>
        </Modal>
      </Fragment>
    )
  }
}

export default MakeComment;
