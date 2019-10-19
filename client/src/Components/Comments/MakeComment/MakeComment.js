import React, {Component, Fragment} from 'react';
import {Modal, Button} from 'antd';
import CreateItem from '../../CreateItem/CreateItem';

/*
  There are two types or levels of comments: comment to a post, comment to another comment.
  MakeComment receive the type property from its father component,
  and pass different API to CreateItem according to the type.
 */

class MakeComment extends Component {
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
    const {postID, commentID, type} = this.props;
    let commentAPI = "";
    if(type === "post" && postID){
      commentAPI = "/posts/" + postID + "/comments/";
    }
    if (type === "secondary" && commentID && postID) {
      commentAPI = "/posts/" + postID + "/comments/" + commentID + "/comments/";
    }
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
