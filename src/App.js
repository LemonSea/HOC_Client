import React from 'react';
import { GlobalStyle } from './style';
import { GlobalIconfont } from './static/iconfont/iconfont';
import {BackGroundStyle } from './assets/backgroundColor';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';


import Main from './pages/main/index';
import Login from './pages/login/index';
import Register from './pages/register/index';
// 注册公司的界面
import RegOfficer from './pages/regFirm/reg-officer';
import RegFirm from './pages/regFirm/reg-firm';
import RegAccount from './pages/regFirm/reg-account';
import RegDone from './pages/regFirm/reg-done';
// 404 界面
import NotFound from './pages/not-found/not-found';

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <GlobalIconfont />
        <Router>
        <Switch>
          {/* 首页 */}
          <Redirect exact from='/' to='/home' />
          {/* 用户注册与登录 */}
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          {/* 公司注册 */}
          <Route path='/reg-officer' component={RegOfficer}></Route>
          <Route path='/reg-firm' component={RegFirm}></Route>
          <Route path='/reg-account' component={RegAccount}></Route>
          <Route path='/reg-done' component={RegDone}></Route>
          <Route path='/' component={Main}></Route>
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
