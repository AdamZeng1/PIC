import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PostItem from '../../Components/Post/PostItem';
import classes from './PostList.module.css';
import {Spin, Row, Pagination} from 'antd';
import axios from '../../axios-pic';

class PostList extends Component {

  state={
    posts: null,
    page: 1,
    per_page: 2,
    loading: true,
  }

  componentWillMount(){
    const query = 'page=' + this.state.page + '&' + 'per_page=' + this.state.per_page;
    axios.get('/post?'+query)
      .then(res => {
        console.log(res);
        this.setState({posts: res.data.posts, loading: false})
      })
      .catch(err => console.log(err));
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.page !== this.state.page){
      const query = 'page=' + this.state.page + '&' + 'per_page=' + this.state.per_page;
    axios.get('/post?'+query)
      .then(res => {
        console.log(res);
        this.setState({posts: res.data.posts, loading: false})
        document.documentElement.scrollTop=0;
      })
      .catch(err => console.log(err));
    }
  }

  postClickHandler = (postData) => {
    let path = {
      pathname: '/post/' + postData._id,
      state: postData,
    }
    this.props.history.push(path);
  }

  pageOnChangeHandler = (pageNum) => {
    this.setState({page: pageNum}, ()=>{console.log(this.state.page)});
    // this.forceUpdate();
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
        <Pagination total={500} onChange={this.pageOnChangeHandler} />
      </div>
    );
  }
}
export default withRouter(PostList);
