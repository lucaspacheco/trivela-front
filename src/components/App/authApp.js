import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import api from 'services/api';
import HomePage from 'pages/home';
import useAppStore from './store';

const AuthApp = () => {
  const setUserInfo = useAppStore((state) => state.setUserInfo);

  useEffect(() => {
    api.interceptors.response.use(undefined, (error) => {
      if (error.response.status === 401) {
        setUserInfo({});
      }
      // eslint-disable-next-line no-param-reassign
      error.originalMessage = error.message;
      Object.defineProperty(error, 'message', {
        get() {
          if (!error.response) {
            return error.originalMessage;
          }
          return (
            error.response.data.errorMessage || 'Ocorreu um erro inesperado.'
          );
        },
      });
      return Promise.reject(error);
    });
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </Router>
  );
};

export default AuthApp;
