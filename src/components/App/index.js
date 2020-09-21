import React, { useEffect, useLayoutEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useMutation, ReactQueryConfigProvider } from 'react-query';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';

import Notifications, { useNotify } from 'components/Notification';
import FullSpinner from 'components/FullSpinner';
import PrivateRoute from 'components/PrivateRoute';
import HomePage from 'pages/home';
import LoginPage from 'pages/login';
import ProfilePage from 'pages/profile';
import MyTeamsPage from 'pages/myTeams';
import theme from 'styles/theme';
import api from 'services/api';
import useAppStore from './store';

const queryConfig = {
  queries: {
    refetchOnWindowFocus: false,
  },
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const notify = useNotify();
  const {
    userInfo: { token },
    login,
    logout,
  } = useAppStore();

  const [checkToken, { isLoading: isLoadingMutation }] = useMutation(
    () =>
      api.get('/refresh-token', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    {
      onError: () => {
        logout();
        setIsLoading(false);
      },
      onSuccess: ({ data }) => {
        login(data);
        setIsLoading(false);
      },
    },
  );

  useEffect(() => {
    const interceptor = api.interceptors.response.use(undefined, (error) => {
      if (error.response.status === 401) {
        notify({
          type: 'error',
          message: 'Sessão expirada, autentique-se novamente',
        });
        logout();
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

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  useLayoutEffect(() => {
    (async () => {
      if (token) await checkToken();
    })();
  }, []);

  if (isLoading || isLoadingMutation) return <FullSpinner />;

  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Notifications />

        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={HomePage} />
            <PrivateRoute exact path="/profile" component={ProfilePage} />
            <PrivateRoute exact path="/my-teams" component={MyTeamsPage} />
            <Route exact path="/login" component={LoginPage} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </ReactQueryConfigProvider>
  );
};

export default App;
