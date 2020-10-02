import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  makeStyles,
} from '@material-ui/core';

import { useMyTeams } from 'queries/index';
import RenderImg from 'components/RenderImg';
import useStore from './store';

const useStyles = makeStyles((theme) => ({
  listItem: {
    display: 'flex',
    alignItems: 'center',

    '& > div': {
      marginLeft: theme.spacing(2),

      '& > p:first-child': {
        fontWeight: 500,
      },
    },
  },
}));

const ChooseTeamModal = ({ open, handleClose }) => {
  const { addTeamsToCart, teams } = useStore((state) => ({
    addTeamsToCart: state.addTeamsToCart,
    teams: state.teams,
  }));
  const [checked, setChecked] = useState(teams);
  const { teams: myTeams, isFetching } = useMyTeams();
  const classes = useStyles();

  useEffect(() => {
    setChecked(teams);
  }, [teams]);

  const handleChecked = (team) => {
    if (checked.some((check) => check.id === team.id)) {
      return setChecked((prevState) =>
        prevState.filter((item) => item.id !== team.id),
      );
    }

    return setChecked((prevState) => [...prevState, team]);
  };

  const handleAddTeams = () => {
    addTeamsToCart(checked);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        Escolha seus times
        {isFetching && (
          <CircularProgress size={18} style={{ marginLeft: '0.5rem' }} />
        )}
      </DialogTitle>
      <DialogContent>
        <List>
          {myTeams.map((team) => (
            <ListItem
              key={team.id}
              onClick={() => handleChecked(team)}
              button
              dense
            >
              <ListItemIcon>
                <Checkbox
                  color="primary"
                  edge="start"
                  checked={checked.some((item) => item.id === team.id)}
                />
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.listItem }}>
                <RenderImg src={team.imageUrl} width={28} height={28} />
                <div>
                  <Typography>{team.name}</Typography>
                  <Typography variant="caption">{team.cartolaName}</Typography>
                </div>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Fechar</Button>
        <Button onClick={handleAddTeams} variant="contained" color="primary">
          Adicionar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChooseTeamModal;
