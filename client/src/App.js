import React, {lazy, Suspense} from 'react';
import mainPage from './Containner/MainPage/MainPage';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Layout from './Containner/Layout/Layout';
import NotFoundPage from './NotFoundPage';
import {Spin} from 'antd';

const PostPage = lazy( () => import('./Containner/PostPage/PostPage'));
// const NotFoundPage = lazy( () => import('./Containner/MainPage/MainPage'));
const PopularPage = lazy( () => import('./Containner/PopularPage/PopularPage'));
const UserPage = lazy( () => import('./Components/User/UserPage/UserPage'));


function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' component={mainPage} exact/>
        <Suspense fallback={<Spin size='large' />}>
          <Route path='/popular' component={PopularPage} />
          <Route path='/user/:username' component={UserPage} />
          <Route path='/post/:postid' component={PostPage}/>
        </Suspense>
        <Route path='*' component={NotFoundPage}/>
      </Switch>
    </Layout>
  );
}

export default App;
