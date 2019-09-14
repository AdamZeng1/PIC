import React from 'react';
import {NavLink} from 'react-router-dom';
import {Card, Icon, Avatar, Meta, Col, Row} from 'antd';

const postItem = (props) => {
  const header = (
    <div>
      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      <span> User Name</span>
    </div>)
  return(
    <Col span={12} offset={6}>
      <Card 
      title={header}
      loading={props.loading}
      hoverable={true}
      onClick={() => props.clicked(props.post)}
      cover={<img 
        src={props.post.image_url[0]}  
        alt={props.post.image_url[0]}
        style={{objectFit:"cover", height:"400px", }}/>}
      >
      <h3>{props.post.title}</h3>
      
      <p>{props.post.created_at}</p>
      </Card>
    </Col>
    
  )
}

export default postItem;
