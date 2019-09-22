import React, {Component} from 'react';
import { Upload, Button, Icon, message } from 'antd';
import axios from '../../axios-pic';

var qiniu = require('qiniu-js');

var config = {
  useCdnDomain: true,
  region: qiniu.region.as0 // service area
};

class UploadImage extends React.Component {
  state = {
    filename: "",
    file: null,
    uploading: false,
  };

  inputChangeHandler = (e) => {
    this.setState({filename: e.target.value})
  }

  handleUpload = async() => {
    const { file, filename } = this.state;
    
    this.setState({
      uploading: true,
    });

    const self = this;

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
            url:self.props.api,
            data:{
              "title": filename,
              "image_url": "http://pxp3tborn.sabkt.gdipper.com/" + res.key,
              "topic": "test default"
            },
            headers: {"Authorization": "Bearer " + localStorage.Token},
          }
        )
          .then( res => {
            self.setState({
              filename: "",
              file: null,
              uploading: false,
            })
            message.success('upload successfully.');
          })
          .catch( err => {
            console.log(err)
          })
      }
    }
    const putExtra = {name:"Extra"};
    const result = await axios.get("http://localhost:9000/qiniu/token");
    const qiniuToken = result.data['qiniu-token'];
    const observable = qiniu.upload(file, filename, qiniuToken, putExtra, config)
    var subscription = observable.subscribe(observer)
  }
  
  render() {
    const { file, uploading } = this.state;
    const props = {
      beforeUpload: image => {
        this.setState(state => ({
          file: image,
        }));
        return false;
      }
    };

    return (
      <div>
        <div >
          <label>Tittle: </label>
          <input type="text" name='tittle' value={this.state.filename}
            onChange={(e)=>this.inputChangeHandler(e)}/>
        </div>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> Select File
          </Button>
        </Upload>
        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={file === null}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? 'Uploading' : 'Start Upload'}
        </Button>
      </div>
    );
  }
}

export default UploadImage;
