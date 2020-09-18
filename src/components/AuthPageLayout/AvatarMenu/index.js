import React, { useState } from 'react';
import {
  IconButton,
  Avatar,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import {
  Edit as EditIcon,
  PowerSettingsNew as PowerSettingsNewIcon,
} from '@material-ui/icons';

import useAppStore from 'components/App/store';

const useStyles = makeStyles((theme) => ({
  button: {
    '& > span > svg': {
      marginRight: theme.spacing(1),
    },
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const AvatarMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { userInfo, setUserInfo } = useAppStore();

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  return (
    <>
      <IconButton className={classes.button} onClick={handleOpenMenu}>
        <Avatar className={classes.avatar}>
          {userInfo?.userName?.substring(0, 1)}
        </Avatar>
      </IconButton>
      <Menu
        getContentAnchorEl={null}
        anchorEl={anchorEl}
        open={!!anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={handleCloseMenu}
      >
        <MenuItem>
          <EditIcon className={classes.icon} />
          <Typography variant="body1">Alterar dados</Typography>
        </MenuItem>
        <MenuItem onClick={() => setUserInfo({})}>
          <PowerSettingsNewIcon className={classes.icon} />
          <Typography variant="body1">Sair</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default AvatarMenu;
