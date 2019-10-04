import React, {Component} from 'react';
import { Upload, Icon, message, Button } from 'antd';
import axios from '../../../axios-pic';
import classes from './Upload.module.css';

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
        console.log("upload succeeded");
        console.log('result', res);
        //替换程父组件传进来的方法
        axios(
          { 
            method:"post",
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
          })
          .catch( err => {
            console.log(err.response)
            message.error(err.name)
            self.setState({uploading: false})
          })
      }
    }
    const putExtra = {};
    const result = await axios.get("http://localhost:9000/qiniu/token");
    const qiniuToken = result.data['qiniu-token'];
    const observable = qiniu.upload(file, file.uid, qiniuToken, putExtra, config)
    var subscription = observable.subscribe(observer)
  }
  
  render() {
    const props = {
      beforeUpload: (file, fileList) => {
        this.setState({ file: file });
        if(fileList.length > 0){
          fileList.splice(0, 1, file)
        }
        console.log(fileList);
        return false;
      },
      showUploadList: false,
    };

    return (
      <div>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
        </Dragger>
        <p>{this.state.file ? this.state.file.name : null}</p>
        <div className={classes.UploadBtns}>
          <Button type="danger" >Clear</Button>
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

export default UploadImage;
