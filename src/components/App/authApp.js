import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';

import HomePage from 'pages/home';
import useNotification from 'components/Notification/store';
import api from 'services/api';
import useAppStore from './store';

const AuthApp = () => {
  const setUserInfo = useAppStore((state) => state.setUserInfo);
  const history = useHistory();
  const showNotification = useNotification((state) => state.showNotification);

  useEffect(() => {
    api.interceptors.response.use(undefined, (error) => {
      if (error.response.status === 401) {
        history.push('/');
        showNotification({
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

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </Router>
  );
};

export default AuthApp;
