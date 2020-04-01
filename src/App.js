import React from 'react';
import { GlobalStyle } from './style';
import { GlobalIconfont } from './static/iconfont/iconfont';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';


import Login from './pages/login/index';
import Register from './pages/register/index';
import Main from './pages/main/index';
// 404 界面
import NotFound from './pages/not-found/not-found';

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <GlobalIconfont />
        <Router>
        <Switch>
          <Redirect exact from='/' to='/home' />
          <Route path='/login' component={Login}></Route>
          <Route path='/' component={Main}></Route>
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
