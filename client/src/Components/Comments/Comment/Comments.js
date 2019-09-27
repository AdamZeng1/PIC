import React, {Component} from 'react';
import classes from './Comments.module.css';
import axios from '../../../axios-pic'
import {Collapse} from 'antd';
import Comment from './Comment';
import MakeComment from '../MakeComment/MakeComment'
import {withRouter} from 'react-router-dom';

const {Panel} = Collapse;


class Comments extends Component {
  state = {
    comments: null,
    secondaryComments: null
  }

  UNSAFE_componentWillMount(){
    axios.get("/posts/" + this.props.postID + "/comments/")
      .then( res => {
        console.log(res.data);
        this.setState({comments: res.data.comments})
      })
      .catch(err => console.log(err))
  }

  renderSecondaryComments = activeKey => {
    console.log(activeKey)
    axios.get("/posts/" + this.props.postID + "/comments/" + activeKey + "/comments/")
      .then(res => {
        console.log(res)
        this.setState({secondaryComments: res.data.secondComments})
      })
      .catch(err => {
        console.log(err)
      })
  }

  render(){
    const pathname = this.props.location.pathname;
    let secondComments = null;
    if (this.state.secondaryComments){
      secondComments = this.state.secondaryComments.map( secondComment => {
        return <Comment key={secondComment._id} commentData={secondComment}/>
      })
    }
    return(
      <Collapse bordered={false} onChange={this.renderSecondaryComments}>
        {this.state.comments ? this.state.comments.map( comment => {
          const header = (
            <div>
              <Comment commentData={comment}/>
              <MakeComment type="secondary" commentID={comment._id} pathname={pathname}/>
            </div>
          )
        return (
          <Panel 
            key={comment._id} 
            showArrow={false}
            header={header}>
              <div style={{backgroundColor: "green"}}>
                {/* <Comment commentData={comment}/> */}
                {secondComments}
              </div>
          </Panel>
        )
      }) : null}
      </Collapse>
      // <Tree>
        
      //   {this.state.comments ? this.state.comments.map( node => {
      //   return (
      //     <TreeNode key={node._id} title={<Comment commentData={node}/>}>
      //       {/* {<Comment commentData={node}/>} */}
      //     </TreeNode>
      //   )
      //   }) : null}
        
      // </Tree>
    )
  }
}

export default withRouter(Comments);