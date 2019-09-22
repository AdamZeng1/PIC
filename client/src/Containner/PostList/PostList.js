import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PostItem from '../../Components/Post/PostItem';
import classes from './PostList.module.css';
import {Spin, Row} from 'antd';
import axios from '../../axios-pic';

class PostList extends Component {

  state={
    posts: null,
    postsNum: {
      page: 1,
      per_page: 4,
    },
    loading: true,
  }

  componentWillMount(){
    const query = 'page=' + this.state.postsNum.page + '&' + 'per_page=' + this.state.postsNum.per_page;
    axios.get('/post?'+query)
      .then(res => {
        console.log(res);
        this.setState({posts: res.data.posts, loading: false})
      })
      .catch(err => console.log(err));
  }

  postClickHandler = (postData) => {
    let path = {
      pathname: '/post/' + postData._id,
      state: postData,
    }
    this.props.history.push(path);
  }

  render(){
    let posts = <Spin size="large" />;
    if (this.state.posts){
      posts = this.state.posts.map((post, i)=>{
        return(
          <Row gutter={16} style={{margin:"10px"}} key={post._id}>
            <PostItem
              post={post}
              loading={this.state.loading}
              clicked={this.postClickHandler}/>
          </Row>
        )
      })
    }
    return(
      <div className={classes.PostList}>
      {posts}
      {/* <PostItem imgURL='https://images.unsplash.com/photo-1565847179096-9af38a6af8a3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80' /> */}
      </div>
    );
  }
}
export default withRouter(PostList);
