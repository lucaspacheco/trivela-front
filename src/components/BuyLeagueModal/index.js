import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { useMutation } from 'react-query';

import { useMyTeams } from 'queries/index';
import RenderImg from 'components/RenderImg';
import api from 'services/api';

const useStyles = makeStyles((theme) => ({
  controlLabel: {
    marginTop: theme.spacing(2),
  },
  teamLabel: {
    display: 'flex',
    alignItems: 'center',

    '& > div:last-child': {
      marginLeft: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
    },
  },
  mutationErrorMessage: {
    alignSelf: 'flex-start',
    marginTop: theme.spacing(1.5),
  },
  successMessage: {
    marginTop: theme.spacing(2),
  },
}));

const BuyLeagueModal = ({ open, handleClose, league }) => {
  const classes = useStyles();
  const { teams = [], isFetching } = useMyTeams();
  const [teamValue, setTeamValue] = useState('');

  const [
    buyLeague,
    { isLoading, isSuccess, error: mutationError, reset },
  ] = useMutation(
    () =>
      api.post('/buy-league', {
        league,
        team: teams.filter((item) => item.id.toString() === teamValue),
      }),
    {
      onSuccess: ({ data: { buyLink } }) => {
        window.open(buyLink, '_blank');
      },
    },
  );

  useEffect(() => {
    reset();
  }, [league]);

  const handleChange = ({ target: { value } }) => setTeamValue(value);

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      PaperProps={{
        style: {
          margin: '3.2rem 1.2rem',
        },
      }}
    >
      <DialogTitle>Comprar liga {league.label}</DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
          <FormLabel component="legend">Escolha seu time</FormLabel>
          <RadioGroup value={teamValue} onChange={handleChange}>
            {teams.map((team) => (
              <FormControlLabel
                className={classes.controlLabel}
                key={team.id}
                value={team.id.toString()}
                control={<Radio />}
                label={
                  <div className={classes.teamLabel}>
                    <RenderImg src={team.imageUrl} width={28} height={28} />
                    <div>
                      <Typography>{team.name}</Typography>
                      <Typography variant="caption">
                        {team.cartolaName}
                      </Typography>
                    </div>
                  </div>
                }
              />
            ))}
            {isFetching && <CircularProgress />}
          </RadioGroup>
        </FormControl>

        {mutationError?.message && (
          <Typography color="error" className={classes.mutationErrorMessage}>
            {mutationError.message}
          </Typography>
        )}

        {isSuccess && (
          <Typography color="primary" className={classes.successMessage}>
            Recebemos sua solicitação, por favor efetue o pagamento para
            confirmar
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={buyLeague}
          disabled={isLoading || !teamValue}
        >
          Comprar
          {isLoading && (
            <CircularProgress size="3.2rem" style={{ position: 'absolute' }} />
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

BuyLeagueModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  league: PropTypes.shape({
    label: PropTypes.string,
  }).isRequired,
};

export default BuyLeagueModal;
