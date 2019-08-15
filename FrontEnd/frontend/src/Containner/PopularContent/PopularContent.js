import React, {Component} from 'react';
import classes from './PopularContent.module.css';
import PostCard from '../../Components/PostCard/PostCard';
import {Row} from 'antd';

class PopularContent extends Component {
  render() {
    return(
      // <div className={classes.PopularContent}>
        /* <h3>Most Popular Posts</h3> */
        <Row gutter={{sm: 16}} className={classes.PopularContent} justify="space-around">
          <PostCard />
        </Row>
      // </div>
    )
  }
}

export default PopularContent;