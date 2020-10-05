import React from 'react';
import {
  Paper,
  Button,
  Typography,
  CircularProgress,
  TextField,
  FormHelperText,
  FormControl,
} from '@material-ui/core';
import { useMutation, useQuery } from 'react-query';
import { useFormik } from 'formik';
import Autocomplete from '@material-ui/lab/Autocomplete';

import AuthPageLayout from 'components/AuthPageLayout';
import TextInput from 'components/TextInput';
import { useNotify } from 'components/Notification';
import useAppStore from 'components/App/store';
import api from 'services/api';
import { useLeagues, useMyTeams } from 'queries/index';
import useStyles from './styles';
import validationSchema from './validationSchema';

const ContactUs = () => {
  const classes = useStyles();
  const notify = useNotify();
  const userInfo = useAppStore((state) => state.userInfo);

  const { leagues, isFetching: isFetchingLeagues } = useLeagues();
  const { teams, isFetching: isFetchingTeams } = useMyTeams();

  const {
    data: { data: { options = [] } = {} } = {},
    isFetching: fetchingOptions,
  } = useQuery('contact-options', () => api.get('/contact-options'), {
    staleTime: Infinity,
  });

  const [
    sendForm,
    { isLoading, reset: resetMutation, error: mutationError },
  ] = useMutation(
    ({ ...formValues }) =>
      api.post('/contact-form', { ...formValues, ...userInfo }),
    {
      onSuccess: () => {
        notify({
          type: 'success',
          message:
            'Obrigado por sua mensagem, retornaremos o mais breve possível.',
        });
      },
    },
  );

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: {
      reason: null,
      league: null,
      team: null,
      description: '',
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: (formValues) => {
      sendForm({ ...formValues });
    },
  });

  return (
    <AuthPageLayout
      heading="Fale conosco"
      isFetching={fetchingOptions || isFetchingLeagues || isFetchingTeams}
    >
      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        <Paper elevation={2} className={classes.paper}>
          <Typography variant="h6" align="center" paragraph>
            Tem alguma dúvida ou problema com nossa plataforma?
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Nos envie uma mensagem e retornaremos o contato através do seu
            e-mail.
          </Typography>

          <FormControl fullWidth variant="outlined" className={classes.input}>
            <Autocomplete
              options={options}
              getOptionLabel={(option) => option.description || ''}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Selecione o motivo"
                  placeholder="Selecione o motivo do contato"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  error={!!errors.reason}
                  margin="dense"
                  required
                />
              )}
              value={values.reason}
              onChange={(_, newValue) => setFieldValue('reason', newValue)}
              disabled={fetchingOptions}
              noOptionsText="Nenhum resultado encontrado"
            />
            {!!errors.reason && (
              <FormHelperText error>{errors.reason}</FormHelperText>
            )}
          </FormControl>

          {values.reason?.value === 'team-not-added' && (
            <>
              <FormControl
                fullWidth
                variant="outlined"
                className={classes.input}
              >
                <Autocomplete
                  options={leagues}
                  getOptionLabel={(option) =>
                    option.label ? option.label : ''
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Selecione a liga"
                      placeholder="Selecione a liga"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      error={!!errors.league}
                      margin="dense"
                      required
                    />
                  )}
                  value={values.league}
                  onChange={(_, newValue) => setFieldValue('league', newValue)}
                  disabled={fetchingOptions}
                  noOptionsText="Nenhum resultado encontrado"
                />
                {!!errors.league && (
                  <FormHelperText error>{errors.league}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                variant="outlined"
                className={classes.input}
              >
                <Autocomplete
                  options={teams}
                  getOptionLabel={(option) => option.name || ''}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Selecione o time"
                      placeholder="Selecione o time"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      error={!!errors.team}
                      margin="dense"
                      required
                    />
                  )}
                  value={values.team}
                  onChange={(_, newValue) => setFieldValue('team', newValue)}
                  disabled={fetchingOptions}
                  noOptionsText="Nenhum resultado encontrado"
                />
                {!!errors.team && (
                  <FormHelperText error>{errors.team}</FormHelperText>
                )}
              </FormControl>
            </>
          )}

          <TextInput
            className={classes.input}
            error={errors.description}
            label="Descrição"
            name="description"
            onChange={handleChange}
            placeholder="Descreva a razão do seu contato"
            variant="outlined"
            value={values.description}
            type="text"
            rows={4}
            rowsMax={10}
            multiline
            fullWidth
            required
          />

          {mutationError?.message && (
            <Typography color="error" className={classes.mutationErrorMessage}>
              {mutationError.message}
            </Typography>
          )}

          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            type="submit"
            disabled={isLoading}
            fullWidth
            onClick={mutationError ? resetMutation : null}
          >
            Enviar
            {isLoading && (
              <CircularProgress
                size="3.2rem"
                style={{ position: 'absolute' }}
              />
            )}
          </Button>
        </Paper>
      </form>
    </AuthPageLayout>
  );
};

export default ContactUs;
