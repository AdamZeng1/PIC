import React from 'react';
import Login from './Components/Login/Login';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Layout from './Containner/Layout/Layout';
import PostPage from './Containner/PostPage/PostPage';
import PopularContent from './Containner/PopularContent/PopularContent';


function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/newpost' component={PopularContent}/>
        <Route path='/' exact />
      </Switch>
    </Layout>
  );
}

export default App;
