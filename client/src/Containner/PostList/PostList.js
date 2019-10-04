import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PostItem from '../../Components/Post/PostItem';
import classes from './PostList.module.css';
import {Spin, Pagination} from 'antd';
import axios from '../../axios-pic';

class PostList extends Component {

  state={
    posts: null,
    page: 1,
    per_page: 2,
    loading: true,
  }

  UNSAFE_componentWillMount(){
    const query = '?page=' + this.state.page + '&per_page=' + this.state.per_page;
    axios.get(this.props.api+query)
      .then(res => {
        console.log(res);
        if(this.props.type === 'mainpage'){
          this.setState({posts: res.data.posts, loading: false})
        }
        if(this.props.type === 'popular'){
          this.setState({posts: res.data, loading:false})
        }
      })
      .catch(err => console.log(err));
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.page !== this.state.page){
      const query = 'page=' + this.state.page + '&per_page=' + this.state.per_page;
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
            <PostItem
              key={post._id}
              post={post}
              loading={this.state.loading}
              clicked={this.postClickHandler}
              type={this.props.type}
            />
        )
      })
    }
    return(
      <div className={classes.PostList}>
        {posts}
        <div className={classes.Pagination} >
          <Pagination           
            total={500} 
            onChange={this.pageOnChangeHandler} />
        </div> 
      </div>
    );
  }
}
export default withRouter(PostList);
