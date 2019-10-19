import React, {Component, Fragment} from 'react';
import {Modal, Button} from 'antd';
import CreateItem from '../../CreateItem/CreateItem';

/*
  Pass API to CreateItem according to the level property.
  Pass method property to CreateItem to trigger patch axios to update comments.
 */

class UpdateComment extends Component {
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

  render () {
    const {postID, commentID, level, firstLevelCommentID} = this.props;
    let commentAPI = "";
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

export default UpdateComment;
