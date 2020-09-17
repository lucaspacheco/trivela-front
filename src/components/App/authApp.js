import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import useStore from './store';

const Component = () => {
  const setUserInfo = useStore((state) => state.setUserInfo);
  const userInfo = useStore((state) => state.userInfo);

  console.log(userInfo, 'info');

  return (
    <>
      <h1>Olá {userInfo.userName}</h1>
      <button onClick={() => setUserInfo({})}>Logout</button>
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
