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
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/' component={mainPage} exact/>
        <Route path='/newpost' component={PostPage} />
      </Switch>
    </Layout>
  );
}

export default App;
