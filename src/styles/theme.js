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
      MuiSvgIcon: {
        root: {
          color: colors.grey[600],
        },
      },
      MuiAppBar: {
        colorPrimary: {
          color: colors.common.black,
          backgroundColor: '#EEEEEE',
        },
      },
      MuiSnackbarContent: {
        root: {
          display: 'flex',
          flexWrap: 'no-wrap',
        },
      },
      MuiAlert: {
        icon: {
          alignItems: 'center',
          '& > svg': {
            color: colors.common.white,
            fill: colors.common.white,
          },
        },
        action: {
          '& > button > span > svg': {
            color: colors.common.white,
            fill: colors.common.white,
          },
        },
        message: {
          display: 'flex',
          alignItems: 'center',
        },
      },
    },
  }),
);
