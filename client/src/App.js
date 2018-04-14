import React, { Component } from 'react';
import { withRouter } from 'react-router';
import InitRouter from './routers';
import './App.less';

class App extends Component {
  render() {
    return (
      <div className="app">
        <InitRouter />
      </div>
    );
  }
}

export default withRouter(App);
