import React, {lazy, Suspense} from 'react';
import mainPage from './Containner/MainPage/MainPage';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Layout from './Containner/Layout/Layout';
import {Spin} from 'antd';

const PostPage = lazy( () => import('./Containner/PostPage/PostPage'));
const NotFoundPage = lazy( () => import('./NotFoundPage'));
const PopularPage = lazy( () => import('./Containner/PopularPage/PopularPage'));
const UserPage = lazy( () => import('./Containner/UserPage/UserPage'));
const ForgotPassword = lazy( () => import('./Components/Password/ForgotPassword'));


function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' component={mainPage} exact/>
        <Suspense fallback={<Spin size='large' />}>
          <Switch>
            <Route path='/popular' exact component={PopularPage} />
            <Route path='/user/:username/:id' component={UserPage} />
            <Route path='/post/:postid' component={PostPage}/>
            <Route path='/forgot_password' component={ForgotPassword}/>
            <Route path='*' component={NotFoundPage}/>
          </Switch>
        </Suspense>
      </Switch>
    </Layout>
  );
}

export default App;
