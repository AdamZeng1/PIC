import React, {Component} from 'react';
import MakeComment from '../../Components/Comments/MakeComment/MakeComment';

class PostPage extends Component {


  render(){
    const postData = this.props.location.state;
    console.log(postData);

    return(
      <div>
        <div style={{padding: "50px"}}>
          <p>Post area</p>
          <img src={postData.image_url[0]} />
        </div>

        <div>
          <p>Make Comment Area</p>
          <MakeComment postID={postData._id} />
        </div>
        <hr/>
        <div>Comments area</div>
      </div>
    )
  }
}

export default PostPage;