import React, {Component, Fragment} from 'react';
import Toolbar from '../../Components/Toolbar/Toolbar';
import NavigationItems from '../../Components/NavigationItems/NavigationItems';

class Layout extends Component{
  render() {
    return(
      <Fragment>
        <Toolbar />
        <main>
          {this.props.children}
        </main>
      </Fragment>
    )
  }
}

export default Layout;