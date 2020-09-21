import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  cardWrapper: {
    maxWidth: '40rem',
    width: '100%',
  },
  cardHeader: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing(2.5),
    padding: theme.spacing(1),

    textTransform: 'uppercase',
    textAlign: 'center',

    '& > h6': {
      fontWeight: 'bold',
    },
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: theme.palette.secondary.light,
    borderRadius: theme.spacing(2),
    marginTop: theme.spacing(1),
    padding: `${theme.spacing(2.5)}px ${theme.spacing(3)}px`,

    position: 'relative',
    zIndex: 1,

    '& > p': {
      color: theme.palette.primary.dark,
      fontWeight: 'bold',
      padding: `${theme.spacing(0.5)}px ${theme.spacing(1.5)}px`,

      '& > span': {
        textTransform: 'none',
        fontWeight: 'normal',
      },

      borderTop: `1px solid ${theme.palette.primary.light}`,
    },

    '& > p:last-of-type': {
      borderBottom: `1px solid ${theme.palette.primary.light}`,
    },

    textTransform: 'uppercase',
  },
  button: {
    borderRadius: theme.spacing(1.5),
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
    margin: `${theme.spacing(2)}px ${theme.spacing(6)}px 0`,

    '& > span > p': {
      fontWeight: 'bold',
    },

    '& > span > svg': {
      color: theme.palette.common.white,
      marginLeft: theme.spacing(1),
    },
  },
  priceWrapper: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.light,
    marginTop: `-${theme.spacing(1.5)}px`,
    textAlign: 'center',
    padding: `${theme.spacing(3)}px ${theme.spacing(1.5)}px ${theme.spacing(
      1.5,
    )}px`,

    borderBottomLeftRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),

    '& > h4': {
      fontWeight: 'bold',
    },
  },
}));
