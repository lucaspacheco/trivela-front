import React from 'react';
import {
  Box,
  Paper,
  Button,
  Typography,
  Link,
  CircularProgress,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { useMutation } from 'react-query';
import { EmailOutlined as EmailOutlinedIcon } from '@material-ui/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import TextInput from 'components/TextInput';
import api from 'services/api';
import logo from 'assets/logo.svg';
import { validationMessages } from 'utils/consts';
import RenderImg from 'components/RenderImg';
import useNotification from 'components/Notification/store';
import useStyles from './styles';

const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail inválido')
    .required(validationMessages.required),
});

const ForgotPassword = () => {
  const classes = useStyles();
  const showNotification = useNotification((state) => state.showNotification);

  const [
    recoverPassword,
    { isLoading, reset: resetMutation, error: mutationError },
  ] = useMutation(({ email }) => api.post('/forgot-password', { email }), {
    onSuccess: () => {
      showNotification({
        message: 'E-mail enviado! Não esqueça de verificar sua caixa de spam.',
        type: 'success',
      });
    },
  });

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: signInSchema,
    validateOnChange: false,
    onSubmit: (formValues) => {
      recoverPassword({ ...formValues });
    },
  });

  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      paddingX="1.2rem"
      className={classes.box}
    >
      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        <Paper elevation={2} className={classes.paper}>
          <RenderImg
            className={classes.logo}
            src={logo}
            al="Escudo de time de futebol escrito Trivela e embaixo Smart Club"
          />

          <Typography variant="h5" paragraph>
            Esqueceu sua senha?
          </Typography>
          <Typography variant="body2" paragraph align="center">
            Informe seu e-mail e vamos te enviar um link para redefinição de
            senha.
          </Typography>

          <TextInput
            className={classes.input}
            autoComplete="email"
            error={errors.email}
            label="E-mail"
            name="email"
            onChange={handleChange}
            placeholder="Digite seu e-mail"
            startAdornment={
              <EmailOutlinedIcon color={errors.email ? 'error' : 'inherit'} />
            }
            variant="outlined"
            value={values.email}
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
            Recuperar Senha
            {isLoading && (
              <CircularProgress
                size="3.2rem"
                style={{ position: 'absolute' }}
              />
            )}
          </Button>

          <Typography className={classes.forgotPassword} variant="caption">
            Lembrou a senha?{' '}
            <Link component={RouterLink} to="/login">
              Faça login!
            </Link>
          </Typography>
        </Paper>
      </form>
    </Box>
  );
};

export default ForgotPassword;
