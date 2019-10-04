import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Avatar, Card} from 'antd';
import axios from '../../axios-pic';
import classes from './PostCard.module.css';

const Styles = {
  cardStyle: {
    width: "100%",
    // height: ""
    // marginBottom: "30px",
    // borderRadius: "5px",
  }
}

class PostCard extends Component {
 
  trendingClickHandler = (postItem) => {
    let path = {
      pathname: '/post/' + postItem._id,
      state: postItem,
    }
    console.log(path.state)
    this.props.history.push(path)
  }
  render(){
    // return(
    //   this.state.dummyData.map((data,i)=>{
    //     const title = (
    //       <div>
    //         <h2>{data.title}</h2>
    //       </div>
    //     )
    //     const footer = (
    //       <div style={{ display:"flex", flexDirection:"row",justifyContent:"space-between", alignItems:"baseline", flexWrap:"auto"}}>
    //         <div style={{whiteSpace:"nowrap"}}>
    //           <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    //           <span>{data.username}</span>
    //         </div>
    //         <span style={{whiteSpace:"nowrap", display:"inline-block"}}>&nbsp;{data.comments}&nbsp;comments</span>
    //       </div>
    //     )
    const {numberOfComments, image_url} = this.props.post;
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
          // onClick={()=>this.trendingClickHandler(data)}
          cover={image}>
          {/* <Card.Meta title={title} description={footer} cover={1}/> */}
        </Card>
    )
    //   })
    // )
  }
}

export default withRouter(PostCard);
