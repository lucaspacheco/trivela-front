import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Login from 'pages/login';
import Signup from 'pages/signup';
import ForgotPassword from 'pages/forgotPassword';

const UnauthApp = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={['/', '/login']} component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  );
};

export default UnauthApp;
