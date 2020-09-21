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
  PersonOutlineOutlined as PersonOutlineIcon,
  EmailOutlined as EmailOutlinedIcon,
  LockOutlined as LockOutlinedIcon,
  BrandingWatermarkOutlined as BrandingWatermarkOutlinedIcon,
  PhoneIphone as PhoneIphoneIcon,
} from '@material-ui/icons';
import { useFormik } from 'formik';
import { IMaskInput } from 'react-imask';

import useAppStore from 'components/App/store';
import TextInput from 'components/TextInput';

import api from 'services/api';
import AutoComplete from 'pages/signup/AutoComplete';
import useStyles from './styles';
import validationSchema from './validationSchema';

const Signup = () => {
  const classes = useStyles();
  const history = useHistory();
  const login = useAppStore((state) => state.login);

  const [
    signUp,
    { isLoading, reset: resetMutation, error: mutationError },
  ] = useMutation((formValues) => api.post('/signup', { ...formValues }), {
    onSuccess: ({ data }) => {
      history.push('/');
      login(data);
    },
  });

  const { values, handleSubmit, errors, setFieldValue } = useFormik({
    initialValues: {
      name: '',
      cpf: '',
      cartolaTeam: null,
      cellPhone: '',
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: (formValues) => {
      signUp({ ...formValues });
    },
  });

  const handleChange = ({ target: { name, value } }) =>
    setFieldValue(name, value);

  return (
    <Box
      minHeight="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      paddingX="1.2rem"
      paddingY="2.4rem"
      className={classes.box}
    >
      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        <Paper elevation={2} className={classes.paper}>
          <TextInput
            autoComplete="name"
            className={classes.input}
            error={errors.name}
            margin="dense"
            name="name"
            onChange={handleChange}
            label="Nome"
            placeholder="Digite seu nome"
            startAdornment={
              <PersonOutlineIcon color={errors.name ? 'error' : 'inherit'} />
            }
            variant="outlined"
            value={values.name}
            fullWidth
            required
          />

          <TextInput
            autoComplete="cpf"
            className={classes.input}
            error={errors.cpf}
            inputComponent={IMaskInput}
            inputProps={{
              mask: '000.000.000-00',
              onAccept: (value) =>
                handleChange({ target: { name: 'cpf', value } }),
            }}
            margin="dense"
            name="cpf"
            onChange={handleChange}
            label="CPF"
            placeholder="Digite seu CPF"
            startAdornment={
              <BrandingWatermarkOutlinedIcon
                color={errors.cpf ? 'error' : 'inherit'}
              />
            }
            variant="outlined"
            value={values.cpf}
            fullWidth
            required
          />

          <AutoComplete
            className={classes.input}
            error={errors.cartolaTeam}
            onOptionChange={(option) => setFieldValue('cartolaTeam', option)}
          />

          <TextInput
            autoComplete="cellPhone"
            className={classes.input}
            error={errors.cellPhone}
            inputComponent={IMaskInput}
            inputProps={{
              mask:
                values.cellPhone.length > 14
                  ? '(00) 00000-0000'
                  : '(00) 0000-0000[0]',
              onAccept: (value) =>
                handleChange({ target: { name: 'cellPhone', value } }),
            }}
            margin="dense"
            name="cellPhone"
            onChange={handleChange}
            label="Celular"
            placeholder="Digite seu celular"
            startAdornment={
              <PhoneIphoneIcon color={errors.cellPhone ? 'error' : 'inherit'} />
            }
            variant="outlined"
            value={values.cellPhone}
            fullWidth
            required
          />

          <TextInput
            autoComplete="email"
            className={classes.input}
            error={errors.email}
            margin="dense"
            name="email"
            onChange={handleChange}
            label="E-mail"
            placeholder="Digite seu e-mail"
            startAdornment={
              <EmailOutlinedIcon color={errors.email ? 'error' : 'inherit'} />
            }
            type="email"
            variant="outlined"
            value={values.email}
            fullWidth
            required
          />

          <TextInput
            autoComplete="confirmEmail"
            className={classes.input}
            error={errors.confirmEmail}
            margin="dense"
            name="confirmEmail"
            onChange={handleChange}
            label="Confirme o e-mail"
            placeholder="Confirme seu e-mail"
            startAdornment={
              <EmailOutlinedIcon
                color={errors.confirmEmail ? 'error' : 'inherit'}
              />
            }
            type="email"
            variant="outlined"
            value={values.confirmEmail}
            fullWidth
            required
          />

          <TextInput
            autoComplete="password"
            className={classes.input}
            error={errors.password}
            margin="dense"
            name="password"
            onChange={handleChange}
            label="Senha"
            placeholder="Digite sua senha"
            startAdornment={
              <LockOutlinedIcon color={errors.password ? 'error' : 'inherit'} />
            }
            type="password"
            variant="outlined"
            value={values.password}
            fullWidth
            required
          />

          <TextInput
            autoComplete="confirmPassword"
            className={classes.input}
            error={errors.confirmPassword}
            margin="dense"
            name="confirmPassword"
            onChange={handleChange}
            label="Confirme a senha"
            placeholder="Confirme sua senha"
            startAdornment={
              <LockOutlinedIcon
                color={errors.confirmPassword ? 'error' : 'inherit'}
              />
            }
            type="password"
            variant="outlined"
            value={values.confirmPassword}
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
            Cadastrar
            {isLoading && (
              <CircularProgress
                size="3.2rem"
                style={{ position: 'absolute' }}
              />
            )}
          </Button>
          <Typography className={classes.signIn} variant="caption">
            Já tem uma conta?{' '}
            <Link component={RouterLink} to="/login">
              Faça login!
            </Link>
          </Typography>
        </Paper>
      </form>
    </Box>
  );
};

export default Signup;
