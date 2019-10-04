import React, {Component} from 'react';
import MakeComment from '../../Components/Comments/MakeComment/MakeComment';
import classes from './PostPage.module.css';
import Comments from '../../Components/Comments/Comments';
import UserAvatar from '../../Components/User/UserAvatar';
import axios from '../../axios-pic';
import {Spin, Card} from 'antd';

var moment = require('moment');

class PostPage extends Component {
  state = {
    post: null
  }

  UNSAFE_componentWillMount(){
    axios.get(this.props.location.pathname)
      .then( res => {
        this.setState({post: res.data});
      })
      .catch( err => {
        console.log(err.response);
        if(err.response.status === 404){
          // alert("NOT FOUND");
          this.props.history.push("/notFound");
        }
      })
  }

  render(){
    let pageContent = <Spin size="large" />
    if (this.state.post) {
      const postData = this.state.post;
      pageContent = (
        <div className={classes.PostpageWrapper}>
          <Card
            style={{marginBottom: "16px"}}
            title={<UserAvatar type="postHeader" name={postData.post_owner.name}/>}>
            <img alt="post" src={postData.image_url[0]} className={classes.PostImage}/>
            <div className={classes.PostFooter}>
              <p>{"Last Update: " + moment(postData.updateAt).format("YYYY-MM-DD hh:mm:ss")}</p>
              <MakeComment type="post" postID={postData._id} />
            </div>
          </Card>
          <div>
            <h2>Comments</h2>
            <hr />
            <Comments postID={postData._id} />
          </div>
        </div>
      )
    }
    return (
      <div>
        {pageContent}
      </div>
    )
  }
}

export default PostPage;