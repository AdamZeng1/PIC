import React, {Component, Fragment} from 'react';
import {Modal, Icon, Button} from 'antd';
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
    const {postID, commentID, type, level, firstLevelCommentID} = this.props;
    let commentAPI = "";
    if(type === "post" && postID){
      commentAPI = "/posts/" + postID + "/comments/";
    }
    if (type === "secondary" && commentID && postID) {
      commentAPI = "/posts/" + postID + "/comments/" + commentID + "/comments/";
    }
    if (level === "first" && commentID && postID){
      commentAPI = "/posts/" + postID + "/comments/" + commentID;
    }
    if (level === "second" && commentID && postID && firstLevelCommentID) {
      commentAPI = "/posts/" + postID + "/comments/" + firstLevelCommentID + "/comments/" + commentID;
    }
    return(
      <Fragment>
        <Button
          type="link"
          style={{color:'red'}}
          onClick={this.showModal}>
            Edit
        </Button>
        <Modal
          centered
          title="Edit Comment"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <CreateItem api={commentAPI} close={this.handleCancel} method="patch"/>
        </Modal>
      </Fragment>
    )
  }
}

export default MakeComment;
