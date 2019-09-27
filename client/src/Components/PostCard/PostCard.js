import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Avatar, Card} from 'antd';
import axios from '../../axios-pic';
import classes from './PostCard.module.css';

const Styles = {
  cardStyle: {
    width: "100%",
    height: ""
    // marginBottom: "30px",
    // borderRadius: "5px",
  }
}

class PostCard extends Component {
  //Initialize fake data
  state ={
    dummyData:[
      {
        username: "Tommy",
        image_url:{ 0:"https://images.unsplash.com/photo-1565728903699-cb4a5bf923cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"},
        title:"Wow",
        comments: 1123,
      },
      {
        username: "Johnny",
        image_url: {0:"https://images.unsplash.com/photo-1554757716-46f23cad3134?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"},
        title:"Hello",
        comments: 567,
      },
      {
        username: "Jason",
        image_url: {0:"https://images.unsplash.com/photo-1565551822438-a58475994b2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"},
        title:"123",
        comments: 345,
      },
      {
        username: "Jerry",
        image_url: {0:"https://images.unsplash.com/photo-1565645289302-8ae14731e16e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"},
        title:"123",
        comments: 111,
      },
      {
        username: "Tommy",
        image_url:{ 0:"https://images.unsplash.com/photo-1565728903699-cb4a5bf923cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"},
        title:"Wow",
        comments: 1123,
      },
      {
        username: "Johnny",
        image_url: {0:"https://images.unsplash.com/photo-1554757716-46f23cad3134?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"},
        title:"Hello",
        comments: 567,
      },
      {
        username: "Jason",
        image_url: {0:"https://images.unsplash.com/photo-1565551822438-a58475994b2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"},
        title:"123",
        comments: 345,
      },
      {
        username: "Jerry",
        image_url: {0:"https://images.unsplash.com/photo-1565645289302-8ae14731e16e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"},
        title:"123",
        comments: 111,
      },
      {
        username: "Tommy",
        image_url:{ 0:"https://images.unsplash.com/photo-1565728903699-cb4a5bf923cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"},
        title:"Wow",
        comments: 1123,
      },
      {
        username: "Johnny",
        image_url: {0:"https://images.unsplash.com/photo-1554757716-46f23cad3134?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"},
        title:"Hello",
        comments: 567,
      }
    ],
  }

  //Get data from backend
  UNSAFE_componentWillMount(){
    const self = this
    //Use post as trending during no comments
    // axios.get('/post/')
    axios.get('/post/threads/posts')
      .then(function (res) {
        if(res.data.posts)
          self.setState({dummyData:res.data.posts})
      })
  }
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
    const {numberOfComments, post} = this.props.data;
    const image = (
      <div className={classes.ImageWrapper}>
        <img  alt="trendings" src={post[0].image_url[0]} />
        <div>{numberOfComments + " comments"}</div>
      </div>
    )
        return(
            <Card hoverable key={post[0]._id}
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
