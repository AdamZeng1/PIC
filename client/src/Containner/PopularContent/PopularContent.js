import React, {Component} from 'react';
import classes from './PopularContent.module.css';
import PostCard from '../../Components/PostCard/PostCard';
import axios from '../../axios-pic';
import {Carousel} from 'antd';

class PopularContent extends Component {
  state = {
    posts: null,
    loading: false,
  }
  UNSAFE_componentWillMount(){
    axios.get("/post/threads/posts")
      .then( res => {
        this.setState({posts: res.data});
      })
      .catch( err => console.log(err))
  }

  render() {
    let carouselArray = [];
    if(this.state.posts){
      const carouselContent = this.state.posts.map(data => {
        return <PostCard key={data._id} data={data} />
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
      <div className={classes.PopularContent}>
        <h2> Trending Top 10 </h2>
        {carouselArray}
      </div>
    )
  }
}

export default PopularContent;
