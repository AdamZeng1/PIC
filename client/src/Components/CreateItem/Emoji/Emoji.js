import React, {Component} from 'react';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import classes from './Emoji.module.css';
import {message, Button} from 'antd';
import axios from '../../../axios-pic';
import {withRouter} from 'react-router-dom';

/*
  emoji-mart package is a third party package: https://github.com/missive/emoji-mart
  Selected emoji can be deleted by clicking itself.
 */

class Emoji extends Component {
  state = {
    emojiList: [],
  }

  emojiSelectHandler = (emoji) => {
    const newEmojiList = [...this.state.emojiList, emoji];
    this.setState({emojiList: newEmojiList});   
  }

  emojiDeleteHandler = (key) => {
    const newEmojiList = [...this.state.emojiList];
    newEmojiList.splice(key,1)
    this.setState({emojiList: newEmojiList});
  }

  clearEmojiListHandler = () => {
    this.setState({emojiList: []})
  }

  sendPostHandler = () => {
    let method = "post";
    if (this.props.method) {
      method = this.props.method;
    }
    const api = this.props.api
    const emojiList = this.state.emojiList
    axios({
      method: method,
      url: api,
      data: {
              type: "emoji",
              emoji: emojiList
            },
      headers: {"Authorization": "Bearer " + localStorage.Token},
    })
    .then(res => {
      message.success ("Succeed");
      this.props.close();
      setTimeout( () => this.props.history.go(0), 1000);
    })
    .catch( err => {
      console.log(err.response)
      if(err.response.status === 401){
        message.error ("Token Expired. Please login again.");
      }
    })
  }

  render(){
    return(
      <div className={classes.EmojiWrapper}>
        <div className={classes.DisplayEmojis}>
          {this.state.emojiList.map((emoji, i) => 
            <span key={i} onClick={ () => this.emojiDeleteHandler(i)}>
              {emoji.native}
            </span>)
          }
        </div>
        <div className={classes.EmojiBtn}>
          <Button type="danger" onClick={this.clearEmojiListHandler}>Clear</Button>
          <Button 
            type="primary"
            disabled={this.state.emojiList.length === 0}
            onClick={this.sendPostHandler}>
              Post
          </Button>
        </div>
        <Picker set="apple" size={16} onSelect={this.emojiSelectHandler}/>
      </div>
    )  
  }
}

export default withRouter(Emoji);