import React from 'react';
import { GlobalStyle } from './style';
import { GlobalIconfont } from './static/iconfont/iconfont';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import Header from './common/header';
import Home from './pages/home';
import Brand from './pages/brand';

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <GlobalIconfont />
      <div>
        {/* 头部 */}
        <Header />
        {/* 搜索框 */}
        {/* <SearchBox /> */}
        <Router>
          <div>
            <Route path='/' exact component={Home}></Route>
            <Route path='/brand' component={Brand}></Route>
          </div>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
