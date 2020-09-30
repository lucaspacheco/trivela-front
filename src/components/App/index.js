import React, { useEffect, useLayoutEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useMutation, ReactQueryConfigProvider } from 'react-query';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';

import Notifications, { useNotify } from 'components/Notification';
import FullSpinner from 'components/FullSpinner';
import PrivateRoute from 'components/PrivateRoute';

import HomePage from 'pages/home';
import LoginPage from 'pages/login';
import SignupPage from 'pages/signup';
import ProfilePage from 'pages/profile';
import MyTeamsPage from 'pages/myTeams';
import MyPaymentsPage from 'pages/myPayments';
import LeaguesPage from 'pages/leagues';
import ContactUsPage from 'pages/contactUs';

import theme from 'styles/theme';
import api from 'services/api';
import RedirectIfAuthenticated from './RedirectIfAuthenticated';
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
      else setIsLoading(false);
    })();
  }, []);

  if (isLoading || isLoadingMutation) return <FullSpinner />;

  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Notifications />

        <Router>
          <RedirectIfAuthenticated />
          <PrivateRoute exact path="/" component={HomePage} />
          <PrivateRoute exact path="/profile" component={ProfilePage} />
          <PrivateRoute exact path="/my-teams" component={MyTeamsPage} />
          <PrivateRoute exact path="/my-payments" component={MyPaymentsPage} />
          <PrivateRoute exact path="/leagues" component={LeaguesPage} />
          <PrivateRoute exact path="/contact-us" component={ContactUsPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
        </Router>
      </MuiThemeProvider>
    </ReactQueryConfigProvider>
  );
};

export default App;
