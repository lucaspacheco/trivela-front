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
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useMutation, useQueryCache } from 'react-query';

import CartolaSearch from 'components/CartolaSearchBox';
import { validationMessages } from 'utils/consts';
import api from 'services/api';
import { useNotify } from 'components/Notification';

const validationSchema = Yup.object().shape({
  team: Yup.object().nullable().required(validationMessages.required),
});

const useStyles = makeStyles((theme) => ({
  mutationErrorMessage: {
    alignSelf: 'flex-start',
    marginTop: theme.spacing(1.5),
  },
}));

const NewTeamModal = ({ open, handleClose }) => {
  const notify = useNotify();
  const classes = useStyles();
  const queryCache = useQueryCache();

  const [
    createTeam,
    { isLoading, reset: resetMutation, error: mutationError },
  ] = useMutation((formValues) => api.post('/create-team', { ...formValues }), {
    onMutate: ({ team }) => {
      handleClose();
      queryCache.cancelQueries('my-teams');

      const previousTeams = queryCache.getQueryData('my-teams');

      const normalizedCartolaTeam = {
        id: team.time_id,
        name: team.nome,
        cartolaName: team.nome_cartola,
        imageUrl: team.url_escudo_svg,
      };

      queryCache.setQueryData('my-teams', (oldValues) => ({
        data: {
          ...oldValues.data,
          teams: [...oldValues.data.teams, normalizedCartolaTeam],
        },
      }));

      return previousTeams;
    },
    onError: (_, __, previousValue) =>
      queryCache.setQueryData('my-teams', previousValue),
    onSuccess: () => {
      notify({
        type: 'success',
        message: 'Time adicionado com sucesso',
      });
      queryCache.invalidateQueries('my-teams');
    },
  });

  const { handleSubmit, errors, setFieldValue } = useFormik({
    initialValues: {
      team: null,
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: (formValues) => {
      createTeam({ ...formValues });
    },
  });

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
      <form onSubmit={handleSubmit} noValidate>
        <DialogTitle>Adicionar novo time</DialogTitle>
        <DialogContent>
          <CartolaSearch
            error={errors.team}
            onOptionChange={(value) => setFieldValue('team', value)}
          />
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
            onClick={mutationError ? resetMutation : null}
            disabled={isLoading}
          >
            Adicionar
            {isLoading && (
              <CircularProgress
                size="3.2rem"
                style={{ position: 'absolute' }}
              />
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

NewTeamModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default NewTeamModal;
