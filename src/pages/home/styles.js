import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  cardsWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gridGap: theme.spacing(6),
    marginTop: theme.spacing(3),

    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    [theme.breakpoints.up('xl')]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
  welcomeMessage: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  name: {
    display: 'inline-block',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.light,
    fontWeight: 'bold',
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1.5)}px`,
    marginTop: theme.spacing(1.5),
    marginLeft: theme.spacing(1.5),
    marginRight: theme.spacing(1.5),
  },
  sectionHeading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    fontWeight: 500,
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(5),

    '&::after': {
      position: 'absolute',
      left: 0,
      bottom: '-0.8rem',
      content: '""',
      width: '10rem',
      borderBottom: `0.5rem solid ${theme.palette.primary.main}`,
      marginLeft: '50%',
      transform: 'translateX(-50%)',
    },

    '& > div': {
      position: 'absolute',
      bottom: theme.spacing(-6),
    },
  },
}));
