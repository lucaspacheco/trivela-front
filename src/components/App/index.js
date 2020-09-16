import React from 'react';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import theme from '../../styles/theme';

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <h1>App</h1>
    </MuiThemeProvider>
  );
};

export default App;
