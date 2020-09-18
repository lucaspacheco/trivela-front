import React, { useLayoutEffect } from 'react';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { useMutation } from 'react-query';

import theme from 'styles/theme';
import UnauthApp from 'components/App/unauthApp';
import AuthApp from 'components/App/authApp';
import api from 'services/api';
import FullSpinner from 'components/FullSpinner';
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

  useLayoutEffect(() => {
    if (token) checkToken(token);
  }, []);

  if (isLoading) return <FullSpinner />;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {token ? <AuthApp /> : <UnauthApp />}
    </MuiThemeProvider>
  );
};

export default App;
