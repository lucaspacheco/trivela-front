import React, { useEffect, useLayoutEffect } from 'react';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { useMutation } from 'react-query';

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

  useLayoutEffect(() => {
    if (token) checkToken(token);
  }, []);

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

  if (isLoading) return <FullSpinner />;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Notification />
      {token ? <AuthApp /> : <UnauthApp />}
    </MuiThemeProvider>
  );
};

export default App;
