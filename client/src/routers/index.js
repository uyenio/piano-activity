import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../containers/HomePage';
import ResultPage from '../containers/ResultPage';

class InitRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/result" component={ResultPage} />
      </Switch>
    );
  }
}

export default InitRouter;
