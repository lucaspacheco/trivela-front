import React from 'react';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import theme from 'styles/theme';
import UnauthApp from 'components/App/unauthApp';
import AuthApp from 'components/App/authApp';
import useStore from './store';

const App = () => {
  const token = useStore((state) => state.userInfo.token);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {token ? <AuthApp /> : <UnauthApp />}
    </MuiThemeProvider>
  );
};

export default App;
