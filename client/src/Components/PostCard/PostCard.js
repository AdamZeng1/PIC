import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Card} from 'antd';
import classes from './PostCard.module.css';

const Styles = {
  cardStyle: {
    width: "100%",
  }
}

class PostCard extends Component {
 
  trendingClickHandler = (postID) => {
    this.props.history.push('/post/' + postID)
  }
  render(){
    const {numberOfComments, image_url, _id} = this.props.post;
    const image = (
      <div className={classes.ImageWrapper}>
        <img  alt="trendings" src={image_url[0]} />
        <div>{numberOfComments[0].count + " comments"}</div>
      </div>
    )
    return(
        <Card hoverable
          style={Styles.cardStyle}
          bodyStyle={{display: "none"}}
          bordered={true}
          onClick={()=>this.trendingClickHandler(_id)}
          cover={image}>
          {/* <Card.Meta title={title} description={footer} cover={1}/> */}
        </Card>
    )
  }
}

export default withRouter(PostCard);
