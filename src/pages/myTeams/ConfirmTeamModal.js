import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useMutation, useQueryCache } from 'react-query';

import api from 'services/api';
import { useNotify } from 'components/Notification';

const useStyles = makeStyles((theme) => ({
  mutationErrorMessage: {
    alignSelf: 'flex-start',
    marginTop: theme.spacing(1.5),
  },
}));

const ConfirmTeamModal = ({ team, handleClose }) => {
  const notify = useNotify();
  const classes = useStyles();
  const queryCache = useQueryCache();

  const [verifyTeam, { isLoading, error: mutationError }] = useMutation(
    () => api.post('/verify-team', { ...team }),
    {
      onError: () =>
        notify({
          type: 'error',
          message: 'Ocorreu um erro. Tente novamente.',
        }),
      onSuccess: () => {
        notify({
          type: 'success',
          message: 'Time adicionado com sucesso',
        });
        queryCache.invalidateQueries('my-teams');
        handleClose();
      },
    },
  );

  return (
    <Dialog
      onClose={handleClose}
      open={!!Object.values(team).length}
      fullWidth
      PaperProps={{
        style: {
          margin: '3.2rem 1.2rem',
        },
      }}
    >
      <DialogTitle>Verificar time</DialogTitle>
      <DialogContent>
        <Typography paragraph>
          Precisamos confirmar a identidade do time <strong>{team.name}</strong>
          .
        </Typography>
        <Typography paragraph>
          Por favor, altere o nome do seu time no Cartola para{' '}
          <strong>{team.cartolaId}</strong>.
        </Typography>
        <Typography paragraph>
          Em seguida pressione o botão <strong>Confirmar time</strong>
        </Typography>
        {mutationError?.message && (
          <Typography color="error" className={classes.mutationErrorMessage}>
            {mutationError.message}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose} disabled={isLoading}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={verifyTeam}
          disabled={isLoading}
        >
          Confirmar time
          {isLoading && (
            <CircularProgress size="3.2rem" style={{ position: 'absolute' }} />
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmTeamModal.propTypes = {
  team: PropTypes.shape({
    cartolaId: PropTypes.string,
    name: PropTypes.string,
  }),
  handleClose: PropTypes.func.isRequired,
};

ConfirmTeamModal.defaultProps = {
  team: {},
};

export default ConfirmTeamModal;
