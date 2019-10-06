import React, {Component} from 'react';
import { Upload, Icon, message, Button } from 'antd';
import axios from '../../../axios-pic';
import classes from './Upload.module.css';
import {withRouter} from 'react-router-dom';

/**
 *
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
  };

  deleteFileHandler = () => {
    this.setState({file: null})
  }

  handleUpload = async() => {
    let method = "post";
    if (this.props.method) {
      method = this.props.method;
    }
    const file = this.state.file;
    const self = this;
    this.setState({
      uploading: true,
    });
    const observer = {
      next(res){
        // ...
      },
      error(err){
        // ...
        console.log(err);
      },
      complete(res){
        axios(
          {
            method: method,
            url: self.props.api,
            data:{
              "title": res.key,
              "image_url": "http://pxp3tborn.sabkt.gdipper.com/" + res.key,
              "topic": "test default",
              "type": "image",
            },
            headers: {"Authorization": "Bearer " + localStorage.Token},
          }
        )
          .then( res => {
            self.setState({
              file: null,
              uploading: false,
            })
            message.success('upload successfully.');
            self.props.close();
            setTimeout( () => self.props.history.go(0), 1000);
          })
          .catch( err => {
            console.log(err.response);
            if (err.response.data.name === "JsonWebTokenError"){
              message.error("Invalid Token, Please Re-Login")
            }
            if ( err.response.data.name ==="TokenExpiredError"){
              message.error("Token expired, Please Re-Login")
            }
            self.setState({uploading: false})
          })
      }
    }
    const putExtra = {};
    const result = await axios.get("/qiniu/token");
    const qiniuToken = result.data['qiniu-token'];
    const observable = qiniu.upload(file, file.uid, qiniuToken, putExtra, config)
    var subscription = observable.subscribe(observer)
  }

  render() {
    const props = {
      beforeUpload: (file, fileList) => {
        const isLt500KB = file.size / 1024 < 500 ;
        if (isLt500KB) {
          this.setState({ file: file });
        }else{
          message.error("Image must smaller than 500KB!")
        }
        if(fileList.length > 0){
          fileList.splice(0, 1, file)
        }
        return false;
      },
      showUploadList: false,
    };
    console.log(this.props);
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
