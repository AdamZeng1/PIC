import React from 'react';
import Login from './Components/Login/Login';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Layout from './Containner/Layout/Layout';


function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/login' componnet={Login}/>
        <Route path='/' exact/>
      </Switch>
    </Layout>
  );
}

export default App;
