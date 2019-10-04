import React from 'react';
import PostList from '../PostList/PostList';

const popularPage = () => {
  const api = "/post/threads/posts";
  return(
    <div>
      <PostList type="popular" api={api}/>
    </div>
  )
};

export default popularPage;