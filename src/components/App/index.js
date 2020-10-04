import React, { useEffect, useLayoutEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useMutation, ReactQueryCacheProvider, QueryCache } from 'react-query';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { ReactQueryDevtools } from 'react-query-devtools';

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
import MyLeaguesPage from 'pages/myLeagues';
import ContactUsPage from 'pages/contactUs';
import LeaguePartialsPage from 'pages/leaguePartials';

import theme from 'styles/theme';
import api from 'services/api';
import RedirectIfAuthenticated from './RedirectIfAuthenticated';
import useAppStore from './store';

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    },
  },
});

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
        api.defaults.headers.Authorization = `Bearer ${data.token}`;
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
    <ReactQueryCacheProvider queryCache={queryCache}>
      <MuiThemeProvider theme={theme}>
        <ReactQueryDevtools initialIsOpen />

        <CssBaseline />
        <Notifications />

        <Router>
          <RedirectIfAuthenticated />
          <PrivateRoute exact path="/" component={HomePage} />
          <PrivateRoute exact path="/profile" component={ProfilePage} />
          <PrivateRoute exact path="/my-teams" component={MyTeamsPage} />
          <PrivateRoute exact path="/my-payments" component={MyPaymentsPage} />
          <PrivateRoute exact path="/leagues" component={LeaguesPage} />
          <PrivateRoute exact path="/my-leagues" component={MyLeaguesPage} />
          <PrivateRoute exact path="/contact-us" component={ContactUsPage} />
          <PrivateRoute
            exact
            path="/league/:id/partials"
            component={LeaguePartialsPage}
          />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
        </Router>
      </MuiThemeProvider>
    </ReactQueryCacheProvider>
  );
};

export default App;
