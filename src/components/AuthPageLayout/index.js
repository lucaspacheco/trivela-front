import React from 'react';
import PropTypes from 'prop-types';
import { Box, AppBar, Toolbar, makeStyles } from '@material-ui/core';

import DrawerMenu from './DrawerMenu';
import AvatarMenu from './AvatarMenu';

const useStyles = makeStyles({
  toolbar: {},
  profileMenu: {
    display: 'flex',
    flexGrow: '1',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

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
      <main>{children}</main>
    </Box>
  );
};

AuthPageLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthPageLayout;
