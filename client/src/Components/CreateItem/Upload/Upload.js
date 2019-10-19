import React, {Component} from 'react';
import { Upload, Icon, message, Button } from 'antd';
import axios from '../../../axios-pic';
import classes from './Upload.module.css';
import {withRouter} from 'react-router-dom';

/**
 * The code of the qiniu part is learned from qiniu document
 * Qiniu Website: https://www.qiniu.com/en
 * Qiniu API: https://developer.qiniu.com/kodo/sdk/1283/javascript
 * This component can be used to upload an image as a post, a comment to post or a comment to comment,
 * or to update post or comment according to the method and api properties.
*/
var qiniu = require('qiniu-js');
var config = {
  useCdnDomain: true,
  region: qiniu.region.as0 // service area
};
const {Dragger} = Upload;

class UploadImage extends Component {
  state = {
    file: null,
    uploading: false,
    percent: null,
  };

  deleteFileHandler = () => {
    this.setState({file: null})
  }

  handleUpload = async() => {
    let method = "post";
    if (this.props.method) {
      method = this.props.method;
    }
    let postID = null;
    const file = this.state.file;
    const self = this;
    this.setState({
      uploading: true,
    });
    const observer = {
      next(res){
        // console.log(res.total.percent)
        // self.setState({percent: res.total.percent});
      },
      error(err){
        console.log(err.message);
        axios(
          {
            method: "delete",
            url: "/post/" + postID,
            data:{
              "title": file.uid,
              "image_url": "http://pxp3tborn.sabkt.gdipper.com/" + file.uid,
              "topic": "test default",
              "type": "image",
            },
            headers: {"Authorization": "Bearer " + localStorage.Token},
          }
        ).then( res => {
          message.error("Upload Failed. Please try again.")
          self.setState({uploading: false})
        }).catch( err => {
          console.log(err.response)
        })
      },
      complete(res){
        self.setState({
          file: null,
          uploading: false,
        })
        message.success('upload successfully.');
        self.props.close();
        setTimeout( () => self.props.history.go(0), 1000);
      }
    }
    const putExtra = {};
    const result = await axios.get("/qiniu/token");
    const qiniuToken = result.data['qiniu-token'];
    const observable = qiniu.upload(file, file.uid, qiniuToken, putExtra, config)    
    axios(
      {
        method: method,
        url: this.props.api,
        data:{
          "title": file.uid,
          "image_url": "http://pzkclenyb.sabkt.gdipper.com/" + file.uid,
          "topic": "test default",
          "type": "image",
        },
        headers: {"Authorization": "Bearer " + localStorage.Token},
      }
    )
      .then( res => {
        console.log(res);
        postID = res.data._id;
        var subscription = observable.subscribe(observer)
      })
      .catch( err => {
        console.log(err.response);
        if (err.response.data.name === "JsonWebTokenError"){
          message.error("Invalid Token, Please Re-Login")
        }
        if ( err.response.data.name ==="TokenExpiredError"){
          message.error("Token expired, Please Re-Login")
        }
        this.setState({uploading: false})
      })
  }

  render() {
    const props = {
      beforeUpload: (file, fileList) => {
        const isLt500KB = file.size / 1024 < 500 ;
        const isRightType = file.type === 'image/jpeg' || file.type === 'image/png' 
                            || file.type === 'image/jpg' || file.type === 'image/gif'; 
        if (isLt500KB && isRightType) {
          this.setState({ file: file });
        }
        if (!isLt500KB){
          message.error("Image must smaller than 500KB!")
        }
        if (!isRightType){
          message.error("You can only upload JPG/PNG/JPEG/GIF file")
        }
        if(fileList.length > 0){
          fileList.splice(0, 1, file)
        }
        return false;
      },
      showUploadList: false,
    };
    return (
      <div>
        <Dragger 
          accept=".jpg, .gif, .png, .jpeg"
        {...props}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
        </Dragger>
        <p>{this.state.file ? this.state.file.name : null}</p>
        <div className={classes.UploadBtns}>
          <Button type="danger" onClick={this.deleteFileHandler} >Clear</Button>
          <Button
            type="primary"
            onClick={this.handleUpload}
            disabled={this.state.file === null}
            loading={this.state.uploading}
          >
          {this.state.uploading ? 'Uploading' : 'Start Upload'}
        </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(UploadImage);
