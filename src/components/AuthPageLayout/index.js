import React from 'react';
import PropTypes from 'prop-types';
import { Box, AppBar, Toolbar, makeStyles } from '@material-ui/core';

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
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '1440px',
    margin: '0 auto',
  },
}));

const AuthPageLayout = ({ children }) => {
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
      <main className={classes.main}>{children}</main>
    </Box>
  );
};

AuthPageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthPageLayout;
