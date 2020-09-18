import React from 'react';
import {
  Menu as MenuIcon,
  Person as PersonIcon,
  SportsSoccer as SportsSoccerIcon,
  Payment as PaymentIcon,
  EmojiEvents as EmojiEventsIcon,
  Today as TodayIcon,
  ContactSupport as ContactSupportIcon,
} from '@material-ui/icons';

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

const useStyles = makeStyles((theme) => ({
  list: {
    '& > div': {
      padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
    },
  },
}));

const DrawerMenu = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenDrawer = (event) => setAnchorEl(event);

  const handleCloseDrawer = () => setAnchorEl(null);

  const DrawerItems = () => (
    <>
      <List className={classes.list}>
        <ListItem button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Meus dados cadastrais" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SportsSoccerIcon />
          </ListItemIcon>
          <ListItemText primary="Meus times" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PaymentIcon />
          </ListItemIcon>
          <ListItemText primary="Meus pagamentos" />
        </ListItem>
      </List>
      <Divider />
      <List className={classes.list}>
        <ListItem button>
          <ListItemIcon>
            <EmojiEventsIcon />
          </ListItemIcon>
          <ListItemText primary="Ligas" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <TodayIcon />
          </ListItemIcon>
          <ListItemText primary="Minhas ligas" />
        </ListItem>
      </List>
      <Divider />
      <List className={classes.list}>
        <ListItem button>
          <ListItemIcon>
            <ContactSupportIcon />
          </ListItemIcon>
          <ListItemText primary="Fale conosco" />
        </ListItem>
      </List>
    </>
  );

  return (
    <>
      <Tooltip title="Menu principal" disableFocusListener>
        <IconButton onClick={handleOpenDrawer}>
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
