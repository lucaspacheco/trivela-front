import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import useStore from './store';

const Component = () => {
  const setToken = useStore((state) => state.setToken);

  return (
    <>
      <h1>Home</h1>
      <button onClick={() => setToken(null)}>Logout</button>
    </>
  );
};

const AuthApp = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Component} />
      </Switch>
    </Router>
  );
};

export default AuthApp;
