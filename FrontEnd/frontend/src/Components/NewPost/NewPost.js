import React, {Component} from 'react';
import { Icon, Modal } from 'antd';
import UploadImg from '../Upload/Upload';
import axios from 'axios';

var qiniu = require('qiniu-js');

var config = {
  useCdnDomain: true,
  region: qiniu.region.as0 // service area
};

const observer = {
  next(res){
    // ...
  },
  error(err){
    // ...
    console.log(err);
  },
  complete(res){
    console.log("upload succeeded");
    console.log('result', res);
  }
}

let putExtra = {
  fname: "",
  params: {},
  mimeType: ["image/png", "image/jpeg", "image/gif"]
};


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

  submit = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const fileName = formData.get('file').name;
    const file = formData.get('file');
    const result = await axios.get("http://localhost:9000/qiniu/token");
    const qiniuToken = result.data['qiniu-token'];
    const observable = qiniu.upload(file, fileName, qiniuToken, putExtra, config)
    var subscription = observable.subscribe(observer) // 上传开始
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
         {/* <UploadImg /> */}
         <form onSubmit={this.submit}>
          <input type="file" name='file'/>
          <input type="submit" value="上传"/>
        </form>
        </Modal>
      </div>
    )
  }
}

export default NewPost;
