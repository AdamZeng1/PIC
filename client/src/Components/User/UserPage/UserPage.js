import React, {Component, Fragment} from 'react';
import axios from '../../../axios-pic';
import { Button } from 'antd';
import PostItem from '../../Post/PostItem';
import classes from './UserPage.module.css';


class UserPage extends Component {
  state = {
    posts: null,
    postsVisible: false,
    comments: null,
  }
  // UNSAFE_componentWillMount(){
  //   axios.get("/post/user/" + localStorage.UserID)
  //     .then( res => {
  //       console.log(res);
  //       this.setState({ posts: res.data })
  //     })
  //     .catch( err => console.log(err.response))
  // }
  showPostsHandler = () => {
    const prevPostsVisible = this.state.postsVisible;
    axios.get("/post/user/" + localStorage.UserID)
      .then( res => {
        console.log(res);
        this.setState({ posts: res.data, postsVisible: !prevPostsVisible})
      })
      .catch( err => console.log(err.response))
  }
  postClickHandler = (postData) => {
    let path = {
      pathname: '/post/' + postData._id,
    }
    this.props.history.push(path);
  }
  render(){
    let postsList = null;
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
    return (
      <div className={classes.PostPageWrapper} >
        <div>
          <Button onClick={this.showPostsHandler}>Posts</Button>
          <hr />
          <div className={classes.Waterfall}>
            {this.state.postsVisible ? postsList : null}
          </div>
        </div>
        <div>
          <h3>Comments</h3>
          <hr />
          
        </div>
      </div>
    )
  }
}

export default UserPage;