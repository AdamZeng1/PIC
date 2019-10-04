import React from 'react';
import mainPage from './Containner/MainPage/MainPage';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Layout from './Containner/Layout/Layout';
import PostPage from './Containner/PostPage/PostPage';
import NotFoundPage from './NotFoundPage';
import PopularPage from './Containner/PopularPage/PopularPage';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/popular' component={PopularPage} />
        <Route path='/newest' />
        <Route path='/' component={mainPage} exact/>
        <Route path='/post/:postid' component={PostPage}/>
        <Route path='*' component={NotFoundPage}/>
      </Switch>
    </Layout>
  );
}

export default App;
