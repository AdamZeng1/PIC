import React, {Component} from 'react';
import classes from './PopularPost.module.css';
import PostCard from '../../PostCard/PostCard';
import axios from '../../../axios-pic';
import {Carousel} from 'antd';

class PopularPost extends Component {
  state = {
    posts: null,
    loading: false,
  }
  UNSAFE_componentWillMount(){
    axios.get("/post/threads/posts?page=1&per_page=5")
      .then( res => {
        // console.log(res);
        this.setState({posts: res.data.result});
      })
      .catch( err => console.log(err.response))
  }

  render() {
    let carouselArray = [];
    if(this.state.posts){
      const carouselContent = this.state.posts.map(post => {
        return <PostCard key={post._id} post={post} />
      });
      carouselArray = (
        <Carousel autoplay>
          {carouselContent[0]}
          {carouselContent[1]}
          {carouselContent[2]}
          {carouselContent[3]}
          {carouselContent[4]}
        </Carousel>
      )
    }
    return(
      <div className={classes.PopularPost}>
        <h3> Popular Posts </h3>
        {carouselArray}
      </div>
    )
  }
}

export default PopularPost;
