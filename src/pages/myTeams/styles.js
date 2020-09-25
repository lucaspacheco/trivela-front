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

        '& $teamName': {
          paddingTop: theme.spacing(2.5),
        },

        '& h6': {
          fontWeight: 'bold',
        },
      },
    },
  },
  title: {
    textAlign: 'left',
    fontWeight: 'bold',
  },
  teamName: {
    '& > div': {
      padding: `${theme.spacing(1)}px 0`,
      display: 'flex',
      alignItems: 'center',

      '& > img': {
        alignSelf: 'flex-start',
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(0.5),
      },
    },
  },
  addButton: {
    alignSelf: 'flex-start',
    marginBottom: theme.spacing(1.5),
  },
  noTeams: {
    textAlign: 'center',
    marginTop: theme.spacing(4),

    '& h6': {
      marginTop: theme.spacing(3),

      '& > button': {
        margin: `0 ${theme.spacing(1)}px`,
      },
    },
  },
}));
