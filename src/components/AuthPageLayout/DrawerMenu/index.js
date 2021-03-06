import React from 'react';
import {
  makeStyles,
  Divider,
  SwipeableDrawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

import menuItems from './menuItems';

const useStyles = makeStyles((theme) => ({
  list: {
    '& > div, & > a': {
      padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
    },
  },
}));

const DrawerMenu = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const buttonRef = React.useRef();

  const handleOpenDrawer = () => setAnchorEl(buttonRef);

  const handleCloseDrawer = () => setAnchorEl(null);

  const DrawerItems = () => (
    <List className={classes.list}>
      {menuItems.map(({ id, component, to, title, icon: Icon, divider }) => (
        <React.Fragment key={id}>
          <ListItem
            button
            component={component}
            to={to}
            onClick={handleCloseDrawer}
          >
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
          {divider && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );

  return (
    <>
      <Tooltip title="Menu principal" disableFocusListener>
        <IconButton ref={buttonRef} onClick={handleOpenDrawer}>
          <MenuIcon />
        </IconButton>
      </Tooltip>
      <SwipeableDrawer
        anchor="left"
        open={!!anchorEl}
        onClose={handleCloseDrawer}
        onOpen={handleOpenDrawer}
      >
        <DrawerItems />{' '}
      </SwipeableDrawer>
    </>
  );
};

export default DrawerMenu;
