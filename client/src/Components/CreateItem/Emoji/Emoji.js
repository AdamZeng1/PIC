import React, {Component} from 'react';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import Button from '../../../UI/Button/Button';
import classes from './Emoji.module.css';
import {message} from 'antd';
import axios from '../../../axios-pic';

class Emoji extends Component {
  state = {
    emojiList: [],
  }

  emojiSelectHandler = (emoji) => {
    const newEmojiList = [...this.state.emojiList, emoji];
    this.setState({emojiList: newEmojiList}, ()=>{console.log(this.state.emojiList);});   
  }

  emojiDeleteHandler = (key) => {
    console.log(key);
    const newEmojiList = [...this.state.emojiList];
    newEmojiList.splice(key,1)
    this.setState({emojiList: newEmojiList}, ()=>{console.log(this.state.emojiList);})
  }

  clearEmojiListHandler = () => {
    this.setState({emojiList: []})
  }

  sendPostHandler = () => {
    const api = this.props.api
    const emojiList = this.state.emojiList
    axios({
      method: "post",
      url: api,
      data: {
              type: "emoji",
              emoji: emojiList
            },
      headers: {"Authorization": "Bearer " + localStorage.Token},
    })
    .then(res => {
      message.success ("Succeed");
      this.clearEmojiListHandler();
    })
    .err( err => {
      message.error (err.name);
    })
  }

  render(){
    console.log(this.props)
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
          <Button type="danger" click={this.clearEmojiListHandler}>Clear</Button>
          <Button class="Primary" disable={this.state.emojiList.length === 0}>Post</Button>
        </div>
        <Picker set="apple" size={16} onSelect={this.emojiSelectHandler}/>
      </div>
    )  
  }
}

export default Emoji;