import React from 'react';
import { GlobalStyle } from './style';
import { GlobalIconfont } from './static/iconfont/iconfont';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from './common/header';
import SearchBox from './common/searchBox';

function App() {
  return (
    <div>
      <GlobalStyle />
      <GlobalIconfont />
      {/* 头部 */}
      <Header />
      {/* 搜索框 */}
      {/* <SearchBox /> */}
    </div>
  );
}

export default App;
