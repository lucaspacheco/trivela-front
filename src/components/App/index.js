import React, { useEffect } from 'react';
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
  const token = useStore((state) => state.userInfo.token);
  const setUserInfo = useStore((state) => state.setUserInfo);

  const [checkToken, { isLoading }] = useMutation(
    (userToken) =>
      api.get('/refresh-token', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }),
    {
      // TODO: Snackbar
      onError: () => setUserInfo({}),
      onSuccess: ({ data }) => setUserInfo(data),
    },
  );

  useEffect(() => {
    if (token) checkToken();
  }, []);

  if (isLoading) return <FullSpinner />;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Notification />

      <Router>
        <Route component={token ? AuthApp : UnauthApp} />
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
