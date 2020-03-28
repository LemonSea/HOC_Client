import React from 'react';
import { GlobalStyle } from './style';
import { GlobalIconfont } from './static/iconfont/iconfont';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import Header from './common/header';

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <GlobalIconfont />
      {/* 头部 */}
      <Header />
      {/* 搜索框 */}
      {/* <SearchBox /> */}
    </Provider>
  );
}

export default App;
