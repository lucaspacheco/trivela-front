import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  button: {},
  paper: {
    borderRadius: theme.shape.borderRadius,
    width: '100%',
  },
  table: {
    borderCollapse: 'collapse',
    borderRadius: theme.shape.borderRadius,

    '& th, & tr:not(:last-child)': {
      borderBottom: `1px solid ${theme.palette.grey[300]}`,
    },

    '& th, & td': {
      padding: `${theme.spacing(0.5)}px ${theme.spacing(4)}px`,
    },

    '@media screen and (max-width: 40em)': {
      '&.responsiveTable': {
        '& td.pivoted': {
          paddingLeft: `calc(40% + 10px) !important`,
        },

        '& tbody tr': {
          border: 'none',
          borderBottom: `1px solid ${theme.palette.grey[300]}`,

          '& $button': {
            marginLeft: theme.spacing(-2),
          },
        },

        '& td': {
          paddingTop: theme.spacing(1.5),
          paddingBottom: theme.spacing(1),
        },
      },
    },
  },
  title: {
    textAlign: 'left',
    fontWeight: 'bold',
  },
  noPayments: {
    textAlign: 'center',
    marginTop: theme.spacing(4),

    '& h6': {
      marginTop: theme.spacing(3),
    },
  },
}));
