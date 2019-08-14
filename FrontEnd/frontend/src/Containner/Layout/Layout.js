import React, {Component, Fragment} from 'react';
import Toolbar from '../../Components/Toolbar/Toolbar';
import classes from './Layout.module.css';

class Layout extends Component{
  render() {
    return(
      <Fragment>
        <Toolbar />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Fragment>
    )
  }
}

export default Layout;