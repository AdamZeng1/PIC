import React, {Component} from 'react';
import {Card} from 'antd';
import Upload from './Upload/Upload';
import Emoji from './Emoji/Emoji';

// a wrapper for Emoji and Upload component

class CreateItem extends Component {
  state = {
    tabKey: "image"
  }
  onTabChange = (key) => {
    this.setState({tabKey: key})
  }
  render () {

    const tableList = [
      {
        key: "image",
        tab:  "Image",
      },
      {
        key: "emoji",
        tab: "Emoji"
      },
    ];

    const contentList = {
      image: <Upload {...this.props}/>,
      emoji: <Emoji {...this.props}/>,
    }
    return (
      <Card
        tabList={tableList}
        activeTabKey={this.state.tabKey}
        onTabChange={key => this.onTabChange(key)}
        bordered={false}
      >
        {contentList[this.state.tabKey]}
      </Card>
    )
  }
}

export default CreateItem;