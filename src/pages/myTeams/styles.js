import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  table: {
    width: '100%',
    '@media screen and (max-width: 40em)': {
      '& .responsiveTable': {
        '& td:nth-of-type(2)': {
          paddingTop: theme.spacing(2.5),
        },

        '& h6': {
          fontWeight: 'bold',
        },
      },
    },
  },
  teamName: {
    display: 'flex',
    alignItems: 'center',

    '& > img': {
      alignSelf: 'flex-start',
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(0.5),
    },
  },
  addButton: {
    alignSelf: 'flex-start',
    marginBottom: theme.spacing(1.5),
  },
  noTeams: {
    textAlign: 'center',
    marginTop: theme.spacing(4),

    '& > button': {
      margin: `0 ${theme.spacing(1)}px`,
    },
  },
}));
