import React, {Component} from 'react';
import PostItem from './PostItem';
import classes from './PostList.module.css';

const fakeData=[
  {username:"Adam",time:"2019-08-04",url:"https://www.google.com//images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"},
  {username:"Ian",time:"2019-08-06",url:"https://www.google.com//images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"},
  {username:"Chirs",time:"2019-08-18",url:"https://www.google.com//images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"},
];
// const fakeData={username:"Chirs",time:"2019-08-04",url:"https://www.google.com//images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"};

class PostList extends Component {
  render(){
    return(
      <div className={classes.PostList}>{
        fakeData.map(function (row){
          return (
            <PostItem data={row}/>
          );
        })
      }</div>
    );
  }
}
export default PostList;
