import React from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  InputAdornment,
  CircularProgress,
} from '@material-ui/core';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import useAppStore from 'components/App/store';
import api from 'services/api';
import logo from 'assets/logo.png';
import useStyles from './styles';

const signInSchema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('Campo obrigatório'),
  password: Yup.string().required('Campo obrigatório'),
});

const Login = () => {
  const classes = useStyles();
  const setToken = useAppStore((state) => state.setToken);
  const history = useHistory();

  const [
    login,
    { isLoading, reset: resetMutation, error: mutationError },
  ] = useMutation(
    ({ email, password }) => api.post('/login', { email, password }),
    {
      onSuccess: ({ data: { token } }) => {
        history.push('/');
        setToken(token);
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
      <form onSubmit={handleSubmit} noValidate>
        <Paper elevation={2} className={classes.paper}>
          <img
            className={classes.logo}
            src={logo}
            alt="Escudo de time de futebol escrito Trivela e embaixo Smart Club"
          />
          <TextField
            name="email"
            label="E-mail"
            type="email"
            variant="outlined"
            placeholder="Digite seu e-mail"
            margin="dense"
            autoComplete="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon
                    color={errors.email ? 'error' : 'inherit'}
                  />
                </InputAdornment>
              ),
            }}
            value={values.email}
            onChange={handleChange}
            error={!!errors.email}
            fullWidth
            required
          />
          {errors.email && (
            <Typography
              variant="caption"
              className={classes.errorMessage}
              color="error"
            >
              {errors.email}
            </Typography>
          )}

          <TextField
            name="password"
            label="Senha"
            type="password"
            variant="outlined"
            placeholder="Digite sua senha"
            margin="dense"
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon
                    color={errors.password ? 'error' : 'inherit'}
                  />
                </InputAdornment>
              ),
            }}
            value={values.password}
            onChange={handleChange}
            error={!!errors.password}
            fullWidth
            required
          />
          {errors.password && (
            <Typography
              variant="caption"
              className={classes.errorMessage}
              color="error"
            >
              {errors.password}
            </Typography>
          )}

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
          <Typography className={classes.signUp} variant="subtitle2">
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
