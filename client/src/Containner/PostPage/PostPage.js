import React, {Component} from 'react';
import MakeComment from '../../Components/Comments/MakeComment/MakeComment';
import classes from './PostPage.module.css';
import Comments from '../../Components/Comments/Comment/Comments'

class PostPage extends Component {


  render(){
    const postData = this.props.location.state;
    console.log(postData);
    return(
      <div className={classes.PostpageWrapper}>
        <div className={classes.PostWrapper}>
          <p>Post area</p>
          <img alt="post" src={postData.image_url[0]} />
        </div>

        <div>
          <MakeComment type="post" postID={postData._id} />
        </div>

        <div>
          <Comments postID={postData._id} />
        </div>
      </div>
    )
  }
}

export default PostPage;