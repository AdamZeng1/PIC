import React from 'react';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import mainPage from './Containner/MainPage/MainPage';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Layout from './Containner/Layout/Layout';
import PostPage from './Containner/PostPage/PostPage';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/popular' />
        <Route path='/newest' />
        <Route path='/' component={mainPage} exact/>
        <Route path='/post/:postid' component={PostPage}/>
      </Switch>
    </Layout>
  );
}

export default App;
