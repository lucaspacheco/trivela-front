import React, { useLayoutEffect } from 'react';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { useMutation } from 'react-query';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import UnauthApp from 'components/App/unauthApp';
import AuthApp from 'components/App/authApp';
import Notification from 'components/Notification';
import FullSpinner from 'components/FullSpinner';
import theme from 'styles/theme';
import api from 'services/api';
import useStore from './store';

const App = () => {
  const {
    userInfo: { token },
    isAuthenticated,
    login,
    logout,
  } = useStore();

  const [checkToken, { isLoading }] = useMutation(
    () =>
      api.get('/refresh-token', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    {
      // TODO: Snackbar
      onError: () => logout(),
      onSuccess: ({ data }) => login(data),
    },
  );

  useLayoutEffect(() => {
    (async () => {
      if (token) await checkToken();
    })();
  }, []);

  if (isLoading) return <FullSpinner />;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Notification />

      <Router>
          <Route component={isAuthenticated ? AuthApp : UnauthApp} />
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
