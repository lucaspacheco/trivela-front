import { createMuiTheme } from '@material-ui/core';

export default createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          fontSize: '62.5%',
          height: '100%',
        },
        body: {
          fontSize: '1rem',
          height: '100%',
        },
        '#app': {
          height: '100%',
        },
        '*': {
          margin: 0,
          padding: 0,
        },
      },
    },
  },
});
