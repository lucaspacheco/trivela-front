import { createTheme, colors, responsiveFontSizes } from '@material-ui/core';

export default responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        light: '#619641',
        main: '#415e1e',
        dark: '#3E592D',
      },
      secondary: {
        light: '#F5BB36',
        main: '#D4BE00',
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
