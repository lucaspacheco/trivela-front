import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from 'pages/login';

const UnauthApp = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={['/', '/login']} component={Login} />
      </Switch>
    </Router>
  );
};

export default UnauthApp;
