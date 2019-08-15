import React, {Fragment} from 'react';
import PopularContent from '../PopularContent/PopularContent';
import PostList from '../../Components/Post/PostList';

const mainPage = () => {
  return(
    <Fragment>
      <PopularContent/>
      <PostList/>
    </Fragment>
  )
}

export default mainPage;