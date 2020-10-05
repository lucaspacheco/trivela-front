import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  Typography,
  makeStyles,
  Divider,
} from '@material-ui/core';
import {
  AddCircle as AddIcon,
  DeleteForever as DeleteForeverIcon,
} from '@material-ui/icons';

import { formatMoney } from 'utils/helpers';
import RenderImg from 'components/RenderImg';
import useStore from './store';
import ChooseTeamModal from './ChooseTeamModal';

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    background: theme.palette.background.paper,
    position: 'sticky',
    top: 0,
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
  },
  card: {
    marginTop: theme.spacing(2),
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${theme.spacing(1)}px ${theme.spacing(1.5)}px`,

    '& > p': {
      fontWeight: 700,
    },

    '&:last-child': {
      paddingBottom: theme.spacing(1),
    },
  },
  price: {
    display: 'flex',
    alignItems: 'center',

    '& > p': {
      fontWeight: 500,
      marginRight: theme.spacing(0.5),
    },
  },
  pricePerTeam: {
    marginTop: '0.5rem',
    alignSelf: 'flex-end',
  },
  divider: {
    margin: theme.spacing(2),
  },
  teamWrapper: {
    display: 'flex',
    alignItems: 'center',

    '& > div': {
      marginLeft: theme.spacing(1),

      '& > p': {
        fontWeight: 500,
      },
    },
  },
  footer: {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    position: 'sticky',
    bottom: 0,
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(2),

    '& > p': {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(3),
    },
  },
  sectionHeading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '& > button': {
      marginRight: theme.spacing(1),
    },
  },
}));

const ShoppingCartModal = ({ open, handleClose }) => {
  const [chooseModalOpen, setChooseModalOpen] = useState(false);

  const classes = useStyles();
  const { leagues, teams, removeTeamFromCart, removeLeagueFromCart } = useStore(
    (state) => ({
      leagues: state.leagues,
      teams: state.teams,
      removeLeagueFromCart: state.removeLeagueFromCart,
      removeTeamFromCart: state.removeTeamFromCart,
    }),
  );

  return (
    <>
      <ChooseTeamModal
        open={chooseModalOpen}
        handleClose={() => setChooseModalOpen(false)}
      />
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle className={classes.dialogTitle}>Carrinho</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <div className={classes.sectionHeading}>
            <Typography variant="h6" color="primary">
              Times
            </Typography>
            <IconButton onClick={() => setChooseModalOpen(true)}>
              <AddIcon color="primary" />
            </IconButton>
          </div>
          {teams.map((team) => (
            <Card className={classes.card} key={team.id}>
              <CardContent className={classes.cardContent}>
                <div className={classes.teamWrapper}>
                  <RenderImg src={team.imageUrl} width={28} height={28} />
                  <div>
                    <Typography>{team.name}</Typography>
                    <Typography variant="caption">
                      {team.cartolaName}
                    </Typography>
                  </div>
                </div>
                <IconButton onClick={() => removeTeamFromCart(team)}>
                  <DeleteForeverIcon fontSize="small" />
                </IconButton>
              </CardContent>
            </Card>
          ))}

          <Divider className={classes.divider} />

          <div className={classes.sectionHeading}>
            <Typography variant="h6" color="primary">
              Ligas
            </Typography>
          </div>

          {leagues.map((league) => (
            <React.Fragment key={league.id}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography>{league.label}</Typography>
                  <div className={classes.price}>
                    <Typography>
                      {formatMoney(league.price * teams.length)}
                    </Typography>
                    <IconButton onClick={() => removeLeagueFromCart(league)}>
                      <DeleteForeverIcon fontSize="small" />
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
              {teams.length > 0 && (
                <Typography className={classes.pricePerTeam} variant="caption">
                  {formatMoney(league.price)} por time
                </Typography>
              )}
            </React.Fragment>
          ))}
        </DialogContent>

        <div className={classes.footer}>
          <Typography variant="body1">
            <strong>Total: </strong>
            {formatMoney(
              leagues.reduce((acc, curr) => {
                // eslint-disable-next-line no-param-reassign
                acc += curr.price * teams.length;
                return acc;
              }, 0),
            )}
          </Typography>
          <DialogActions>
            <Button onClick={handleClose}>Fechar</Button>
            <Button
              variant="contained"
              color="primary"
              disabled={!teams.length || !leagues.length}
            >
              Comprar
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};

export default ShoppingCartModal;
