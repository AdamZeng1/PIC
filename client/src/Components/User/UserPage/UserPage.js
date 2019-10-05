import React, {Component} from 'react';
import axios from '../../../axios-pic';

class UserPage extends Component {
  state = {

  }
  UNSAFE_componentWillMount(){
    axios.get("/post/user/")
  }
  render(){
    return (
      <div>
        Test
      </div>
    )
  }
}

export default UserPage;