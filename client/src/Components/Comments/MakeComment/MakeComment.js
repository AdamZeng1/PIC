import React, {Component} from 'react';
import axios from '../../../axios-pic';
import {Radio, Button, Row, Col} from 'antd';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import UploadImg from '../../Upload/Upload';
import classes from './MakeComment.module.css';

class MakeComment extends Component{
  state = {
    value: "img",
    emojiList: [],
  };

  radioOnChange = (e) => {
    this.setState({value: e.target.value})
  }

  emojiSelectHandler = (emoji) => {
    const newEmojiList = [...this.state.emojiList, emoji];
    this.setState({emojiList: newEmojiList}, ()=>{console.log(this.setState.emojiList);});   
  }

  render(){
    const commnetAPI = "/users/" + this.props.postID + "/comments/";
    let comment = <UploadImg api={commnetAPI}/>
    if (this.state.value === 'emoji'){
      comment = (
        <div>
          <div className={classes.EmojiWrapper}>
            {this.state.emojiList.map(emoji => { return emoji.native})}
          </div>
          <Picker set="apple" onSelect={this.emojiSelectHandler}/>
          <Button type="primary">Post</Button>
        </div>)
    }
    return(
      <Row>
        <Col span={12} offset={6}>
          <Radio.Group onChange={this.radioOnChange} value={this.state.value}>
            <Radio value="img">Image</Radio>
            <Radio value="emoji">Emoji</Radio>
          </Radio.Group>
          {comment}
        </Col>
      </Row>
    )
  }
}

export default MakeComment;
