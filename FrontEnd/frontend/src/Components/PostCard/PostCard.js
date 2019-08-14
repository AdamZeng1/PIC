import React, {Component} from 'react';
import {Card} from 'antd';

class PostCard extends Component {
  state ={
    urls: [
      "https://images.unsplash.com/photo-1565728903699-cb4a5bf923cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1554757716-46f23cad3134?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1565551822438-a58475994b2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
      "https://images.unsplash.com/photo-1565645289302-8ae14731e16e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
    ]
  }

  render(){
    return(
      this.state.urls.map((url,i)=>{
        return(
          <Card hoverable
            bodyStyle={{ height: "200px"}}
            bordered={true}
            cover={<img alt="example" src={url} />}>
              <Card.Meta title="Username" descriptionm="dhfkjahlfk"/>
          </Card>
        )
      })
    )
  }
}

export default PostCard;
