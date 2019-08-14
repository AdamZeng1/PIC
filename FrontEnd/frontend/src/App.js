import React from 'react';
import Login from './Components/Login/Login';
import HomePage from './Components/HomePage/HomePage'
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Layout from './Containner/Layout/Layout';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/' component={HomePage} exact/>
      </Switch>
    </Layout>
  );
}

export default App;
