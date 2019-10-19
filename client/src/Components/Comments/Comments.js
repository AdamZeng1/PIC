import React, {Component} from 'react';
import classes from './Comments.module.css';
import axios from '../../axios-pic'
import Comment from './Comment/Comment';
import MakeComment from './MakeComment/MakeComment'
import {withRouter} from 'react-router-dom';
import {Button} from 'antd';
import SecondComment from './SecondComment/SecondComment';

/*
  Comments is the container of all comments.
  If there are more than 10 comments, a view more button will show up at the end of the page.
  By clicking the button, another set of 10 comments will be async loaded.
  The button will disappear if there are no more comments.
  Secondary comments are async loaded by SecondComment component.
 */

class Comments extends Component {
  state = {
    comments: null,
    page: 1,
    per_page: 10,
    showMoreBtn: false,
  }

  UNSAFE_componentWillMount(){
    const api = "/posts/" + this.props.postID + "/comments/";
    const query = '?page=' + this.state.page + '&per_page=' + this.state.per_page;
    axios.get(api + query)
      .then( res => {
        this.setState({comments: res.data.comments})
        if(res.data.comments.length === this.state.per_page){
          this.setState({showMoreBtn: true})
        }
      })
      .catch(err => console.log(err))
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.page !== this.state.page){
      const api = "/posts/" + this.props.postID + "/comments/";
      const query = '?page=' + this.state.page + '&per_page=' + this.state.per_page;
    axios.get(api+query)
      .then(res => {
        console.log(res);
        const newComments = [...prevState.comments].concat(res.data.comments);
        this.setState({comments: newComments});
        if (res.data.comments.length < this.state.per_page) {
          this.setState({showMoreBtn: false})
        }
      })
      .catch(err => console.log(err.response));
    }
  }

  rederMoreComments = () => {
    const newPage = this.state.page + 1;
    this.setState({page: newPage});
  }

  render(){
    const postID = this.props.match.params.postid;
    let comments = null;
    if (this.state.comments) {
      comments = this.state.comments.map( comment => {
        return (
          <Comment key={comment._id} commentData={comment}>
            <div className={classes.ReplyBtn}>
              <MakeComment type="secondary" commentID={comment._id} postID={postID}/>
            </div>
            <SecondComment commentID={comment._id} postID={postID}/>
          </Comment>
        )
      })
    }

    return(
      <div className={classes.CommentsWrapper}>
        {comments}
        {this.state.showMoreBtn ? 
        <Button
          onClick={this.rederMoreComments}
          className={classes.MoreBtn}>
          View More
        </Button> : null}
      </div>
      
    )
  }
}

export default withRouter(Comments);