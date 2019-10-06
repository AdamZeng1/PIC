import React, {Component, Fragment} from 'react';
import axios from '../../../axios-pic';
import { Button, Collapse, Icon, Spin } from 'antd';
import PostItem from '../../Post/PostItem';
import classes from './UserPage.module.css';
import UserAvatar from '../UserAvatar';
import Comment from '../../Comments/Comment/Comment';

const {Panel} = Collapse;

class UserPage extends Component {
  state = {
    posts: null,
    comments: null,
    secondaryComments: null,
    // activeKey: null
  }
  collapseOnChangeHandler = (key) => {
    console.log(key);
    // this.setState({activeKey: key})
    if ( key === 'post') {
      this.getDataHandler("/post/user/", "posts");
    }
    if ( key === 'first') {
      this.getDataHandler("/posts/user/", "comments")
    }
    if ( key === 'second') {
      this.getDataHandler("/posts/secondComments/user/", "secondaryComments")
    }
  }
  getDataHandler = ( api, dataType) => {
    if ( !this.state[dataType]) {
      axios.get( api + this.props.location.state.id)
        .then( res => {
          console.log(res);
          this.setState((state, props) => {
            return state[dataType] = res.data
          })
        })
    }
  }
  
  postClickHandler = (postData) => {
    let path = {
      pathname: '/post/' + postData._id,
    }
    this.props.history.push(path);
  }
  render(){
    // console.log(this.props)
    let postsList = <Spin />;
    if (this.state.posts){
      postsList = this.state.posts.map( post => {
        return (
          <div className={classes.Item} key={post._id}>
            <PostItem
              extra={true}
              clicked={this.postClickHandler} 
              type="mainpage" 
              post={post} />
          </div>
        )
      })
    }
    let commentsList = <Spin />;
    if (this.state.comments){
      commentsList = this.state.comments.map( comment => {
        return (
          <div className={classes.Item} key={comment._id}>
            <Comment
              extra={true}
              clicked={this.postClickHandler} 
              level="first" 
              commentData={comment} />
          </div>
        )
      })
    }

    let secondaryCommentsList = <Spin />;
    if (this.state.secondaryComments){
      secondaryCommentsList = this.state.secondaryComments.map( comment => {
        return (
          <div className={classes.Item} key={comment._id}>
            <Comment
              extra={true}
              clicked={this.postClickHandler} 
              level="second" 
              commentData={comment} />
          </div>
        )
      })
    }
    return (
      <div className={classes.UserPageWrapper} >
        <UserAvatar type="userpage" owner={{name: this.props.match.params.username}}/>
        <Collapse 
          // activeKey={this.state.activeKey}
          accordion
          bordered={false}
          onChange={this.collapseOnChangeHandler}
          expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0}/>}
        >
          <Panel header="Posts" key="post">
            <div className={classes.Waterfall}>
              {this.state.posts ? postsList : null}
            </div>
          </Panel>
          <Panel header="Comments" key="first">
            <div className={classes.Waterfall}>
              {this.state.comments ? commentsList : null}
            </div>
          </Panel >
          <Panel header="Secondary Comments" key="second">
            <div className={classes.Waterfall}>
              {this.state.secondaryComments ? secondaryCommentsList : null}
            </div>
          </Panel>
        </Collapse>
      </div>
    )
  }
}

export default UserPage;