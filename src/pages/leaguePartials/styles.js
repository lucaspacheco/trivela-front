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

        '& $deleteButton': {
          marginLeft: theme.spacing(-2),
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
  round: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    fontWeight: 500,
  },
}));
