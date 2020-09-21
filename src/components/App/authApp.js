import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';

import HomePage from 'pages/home';
import ProfilePage from 'pages/profile';
import { useNotify } from 'components/Notification';
import api from 'services/api';
import useAppStore from './store';

const AuthApp = () => {
  const {
    userInfo: { token },
    setUserInfo,
  } = useAppStore();
  const history = useHistory();
  const notify = useNotify();

  useEffect(() => {
    api.interceptors.response.use(undefined, (error) => {
      if (error.response.status === 401) {
        history.push('/');
        notify({
          type: 'error',
          message: 'Sessão expirada, autentique-se novamente',
        });
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

  useEffect(() => {
    if (token) api.defaults.headers.Authorization = `Bearer ${token}`;

    return () => {
      delete api.defaults.headers.Authorization;
    };
  }, [token]);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/profile" component={ProfilePage} />
      </Switch>
    </Router>
  );
};

export default AuthApp;
