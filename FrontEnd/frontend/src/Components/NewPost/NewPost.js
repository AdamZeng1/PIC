import React, {Component} from 'react';
import { Icon, Modal, Tooltip, Button} from 'antd';
import UploadImg from '../Upload/Upload';
import axios from 'axios';
import classes from './NewPost.module.css';

var qiniu = require('qiniu-js');

var config = {
  useCdnDomain: true,
  region: qiniu.region.as0 // service area
};

class NewPost extends Component {

  state = {
    visible: false,
    postTittle: null,
    putExtra : {
      fname: "",
      params: {},
      mimeType: ["image/png", "image/jpeg", "image/gif"]
    },

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

  submit = async (e) => {
    e.preventDefault();
    const postTittle = this.state.postTittle;
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
        axios(
          { 
            method:"post",
            url:"http://localhost:9000/post/",
            data:{
              "title": postTittle,
              "image_url": "http://pxp3tborn.sabkt.gdipper.com/" + res.key,
              "topic": "test default"
            },
            headers: {"Authorization": "Bearer " + localStorage.Token},
          }).then((response) => {
            console.log(response);
          }).catch(error => {
            console.error(error);
          })
      }
    }
    let formData = new FormData(e.target);
    const putExtra = {...this.state.putExtra}
    const fileName = this.state.postTittle;
    console.log(putExtra.fname);
    const file = formData.get('file');
    const result = await axios.get("http://localhost:9000/qiniu/token");
    const qiniuToken = result.data['qiniu-token'];
    const observable = qiniu.upload(file, fileName, qiniuToken, putExtra, config)
    var subscription = observable.subscribe(observer) // 上传开始
    this.handleOk();
  };

  inputChangeHandler = (e) => {
    let newInput = e.target.value;
    const newExtra = {...this.state.putExtra}
    newExtra.fname = newInput;
    this.setState({
        putExtra: newExtra,
        postTittle: e.target.value})
  }

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
         <UploadImg api={postAPI}/>
         {/* <form onSubmit={this.submit} className={classes.FormElement}>
            <div >
              <label>Tittle: </label>
              <input type="text" name='tittle' onChange={(e)=>this.inputChangeHandler(e)}/>
            </div>
            <div >
              <label>File: </label>
              <input type="file" name='file'/>
            </div>
            <div>
              <Button type='primary' htmlType='submit'>Submit</Button>
<<<<<<< HEAD
            </div>
          </form>
=======
            </div>   
          </form> */}
>>>>>>> cead91f53a3a17b2530d0d591d009717961e9a3e
        </Modal>
      </div>
    )
  }
}

export default NewPost;
