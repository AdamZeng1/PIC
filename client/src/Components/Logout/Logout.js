import React from 'react';
import {Icon, Tooltip} from 'antd';

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