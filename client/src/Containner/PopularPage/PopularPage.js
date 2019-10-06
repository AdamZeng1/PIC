import React from 'react';
import PostList from '../PostList/PostList';
import classes from './PopularPage.module.css'

const popularPage = () => {
  const api = "/post/threads/posts";
  return(
    <div className={classes.PopularPageWrapper}>
      <PostList type="popular" api={api}/>
    </div>
  )
};

export default popularPage;