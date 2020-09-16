import { createMuiTheme, colors, responsiveFontSizes } from '@material-ui/core';

export default responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        light: '#669c25',
        main: '#415e1e',
        dark: '#2D4115',
      },
    },
    typography: {
      htmlFontSize: 10,
    },
    overrides: {
      MuiSvgIcon: {
        root: {
          color: colors.grey[600],
        },
      },
      MuiCssBaseline: {
        '@global': {
          html: {
            fontSize: '62.5%',
          },
          'html, body, #app': {
            height: '100%',
          },
          '*': {
            margin: 0,
            padding: 0,
          },
        },
      },
    },
  }),
);
