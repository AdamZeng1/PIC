import React, {Component} from 'react';
import PostItem from './PostItem';
import classes from './PostList.module.css';

const fakeData=[
  {username:"Adam",time:"2019-08-04",url:"https://images.unsplash.com/photo-1565847179096-9af38a6af8a3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"},
  {username:"Ian",time:"2019-08-06",url:"https://images.unsplash.com/photo-1565787731524-ee4e8adc05f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=676&q=80"},
  {username:"Chirs",time:"2019-08-18",url:"https://images.unsplash.com/photo-1565792033445-07f8db3faa51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"},
];
// const fakeData={username:"Chirs",time:"2019-08-04",url:"https://www.google.com//images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"};

class PostList extends Component {
  render(){
    return(
      <div className={classes.PostList}>{
        fakeData.map(function (row,i){
          return (
            <PostItem data={row}/>
          );
        })
      }</div>
    );
  }
}
export default PostList;
