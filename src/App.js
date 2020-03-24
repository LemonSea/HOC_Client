import React from 'react';
import { GlobalStyle } from './style';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

function App() {
  return (
    <div>
      <GlobalStyle />
      <div>hello word!</div>
    </div>
  );
}

export default App;
