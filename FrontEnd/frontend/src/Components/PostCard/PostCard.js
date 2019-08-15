import React, {Component} from 'react';
import {Card} from 'antd';

class PostCard extends Component {
  state ={
    dummyData:[
      {
        username: "Tommy",
        url: "https://images.unsplash.com/photo-1565728903699-cb4a5bf923cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
        comments: 1123,
      },
      {
        username: "Johnny",
        url: "https://images.unsplash.com/photo-1554757716-46f23cad3134?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        comments: 567,
      },
      {
        username: "Jason",
        url: "https://images.unsplash.com/photo-1565551822438-a58475994b2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
        comments: 345,
      },
      {
        username: "Jerry",
        url: "https://images.unsplash.com/photo-1565645289302-8ae14731e16e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        comments: 111,
      }
    ],
  }

  render(){
    return(
      this.state.dummyData.map((data,i)=>{
        return(      
            <Card hoverable key={i}
              style={{ width:"300px"}}
              bordered={true}
              cover={<img  style={{objectFit:"cover", height:"300px", }} alt="example" src={data.url} />}>
              <Card.Meta title={data.username} description={data.comments + " comments"}/>
            </Card>
        )
      })
    )
  }
}

export default PostCard;
