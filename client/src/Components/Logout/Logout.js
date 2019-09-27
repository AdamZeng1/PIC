import React from 'react';
import {Icon, Tooltip} from 'antd';
// import {withRouter} from 'react-router-dom';

const logout = (props) => {
    return(
      <div>
        <Tooltip placement="bottom" title="Log Out">
          <Icon type="logout" onClick={props.click}/>
        </Tooltip>
      </div>
    )
}

export default logout;