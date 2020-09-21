import React from 'react';
import {
  Box,
  Paper,
  Button,
  Typography,
  Link,
  CircularProgress,
} from '@material-ui/core';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import {
  EmailOutlined as EmailOutlinedIcon,
  LockOutlined as LockOutlinedIcon,
} from '@material-ui/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import useAppStore from 'components/App/store';
import TextInput from 'components/TextInput';
import api from 'services/api';
import logo from 'assets/logo.svg';
import { validationMessages } from 'utils/consts';
import RenderImg from 'components/RenderImg';
import useStyles from './styles';

const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail inválido')
    .required(validationMessages.required),
  password: Yup.string().required(validationMessages.required),
});

const Login = () => {
  const classes = useStyles();
  const storeLogin = useAppStore((state) => state.login);
  const history = useHistory();

  const [
    login,
    { isLoading, reset: resetMutation, error: mutationError },
  ] = useMutation(
    ({ email, password }) => api.post('/login', { email, password }),
    {
      onSuccess: ({ data }) => {
        storeLogin(data);
        history.push('/');
      },
    },
  );

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signInSchema,
    validateOnChange: false,
    onSubmit: (formValues) => {
      login({ ...formValues });
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

          <TextInput
            className={classes.input}
            error={errors.password}
            label="Senha"
            name="password"
            onChange={handleChange}
            placeholder="Digite sua senha"
            startAdornment={
              <LockOutlinedIcon color={errors.password ? 'error' : 'inherit'} />
            }
            variant="outlined"
            value={values.password}
            type="password"
            fullWidth
            required
          />

          <Typography className={classes.forgotPassword} variant="caption">
            <Link component={RouterLink} to="/forgot-password">
              Esqueci minha senha
            </Link>
          </Typography>

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
            Entrar
            {isLoading && (
              <CircularProgress
                size="3.2rem"
                style={{ position: 'absolute' }}
              />
            )}
          </Button>

          <Typography className={classes.signUp} variant="caption">
            Ainda não tem uma conta?{' '}
            <Link component={RouterLink} to="/signup">
              Cadastre-se!
            </Link>
          </Typography>
        </Paper>
      </form>
    </Box>
  );
};

export default Login;
