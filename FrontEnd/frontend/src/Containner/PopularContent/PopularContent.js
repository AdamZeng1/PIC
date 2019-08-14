import React, {Component} from 'react';
import classes from './PopularContent.module.css';
import PostCard from '../../Components/PostCard/PostCard';

class PopularContent extends Component {
  render() {
    return(
      <div className={classes.PopularContent}>
        {/* <h3>Most Popular Posts</h3> */}
        <PostCard />
      </div>
    )
  }
}

export default PopularContent;