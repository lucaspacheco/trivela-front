import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from 'pages/login';
import Signup from 'pages/signup';

const UnauthApp = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={['/', '/login']} component={Login} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </Router>
  );
};

export default UnauthApp;
