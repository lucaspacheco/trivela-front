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
import * as Yup from 'yup';
import Autocomplete from '@material-ui/lab/Autocomplete';

import AuthPageLayout from 'components/AuthPageLayout';
import TextInput from 'components/TextInput';
import { useNotify } from 'components/Notification';
import useAppStore from 'components/App/store';
import api from 'services/api';
import { validationMessages } from 'utils/consts';
import useStyles from './styles';

const validationSchema = Yup.object().shape({
  reason: Yup.object().nullable().required(validationMessages.required),
  description: Yup.string().required(validationMessages.required),
});

const ContactUs = () => {
  const classes = useStyles();
  const notify = useNotify();
  const userInfo = useAppStore((state) => state.userInfo);

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
      description: '',
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: (formValues) => {
      sendForm({ ...formValues });
    },
  });

  return (
    <AuthPageLayout heading="Fale conosco" isFetching={fetchingOptions}>
      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        <Paper elevation={2} className={classes.paper}>
          <Typography variant="h6" align="center" paragraph>
            Tem alguma dúvida ou problema com nossa plataforma?
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Nos envie uma mensagem e retornaremos o contato através do seu
            e-mail.
          </Typography>

          <FormControl fullWidth variant="outlined">
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
