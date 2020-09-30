import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  AppBar,
  Toolbar,
  CircularProgress,
  Typography,
  makeStyles,
} from '@material-ui/core';

import DrawerMenu from './DrawerMenu';
import AvatarMenu from './AvatarMenu';

const useStyles = makeStyles((theme) => ({
  toolbar: {},
  profileMenu: {
    display: 'flex',
    flexGrow: '1',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  main: {
    padding: `${theme.spacing(4)}px ${theme.spacing(2)}px`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '1440px',
    margin: '0 auto',
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: theme.spacing(3),
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  loader: {
    position: 'absolute',
    right: -40,
  },
}));

const AuthPageLayout = ({ children, heading, isFetching }) => {
  const classes = useStyles();

  return (
    <Box height="100%">
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <DrawerMenu />

          <Box className={classes.profileMenu}>
            <AvatarMenu />
          </Box>
        </Toolbar>
      </AppBar>
      <main className={classes.main}>
        {!!heading && (
          <div className={classes.titleWrapper}>
            <Typography className={classes.title} color="primary" variant="h3">
              {heading}
            </Typography>

            {isFetching && (
              <CircularProgress size={28} className={classes.loader} />
            )}
          </div>
        )}
        {children}
      </main>
    </Box>
  );
};

AuthPageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  heading: PropTypes.string,
  isFetching: PropTypes.bool,
};

AuthPageLayout.defaultProps = {
  isFetching: false,
  heading: '',
};

export default AuthPageLayout;
