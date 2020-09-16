import React from 'react';
import {
  Box,
  Paper,
  TextField,
  OutlinedInput,
  Button,
  Typography,
  Link,
  InputAdornment,
  CircularProgress,
  FormControl,
  InputLabel,
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
import * as Yup from 'yup';

import useAppStore from 'components/App/store';
import { isValidCPF } from 'utils/helpers';
import api from 'services/api';
import useStyles from './styles';

const signInSchema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
  cpf: Yup.string()
    .required('Campo obrigatório')
    .test('cpf-valid', 'CPF inválido', (value) => isValidCPF(value)),
  cellPhone: Yup.string()
    .required('Campo obrigatório')
    .matches(/\(\d{2}\)\s\d{4,5}-\d{4}/g, 'Celular inválido'),
  email: Yup.string().email('E-mail inválido').required('Campo obrigatório'),
  confirmEmail: Yup.string()
    .required('Campo obrigatório')
    .test('emails-match', 'Os e-mails não correspondem', function validate(
      value,
    ) {
      return this.parent.email === value;
    }),
  password: Yup.string().required('Campo obrigatório'),
  confirmPassword: Yup.string()
    .required('Campo obrigatório')
    .test('passwords-match', 'As senhas não correspondem', function validate(
      value,
    ) {
      return this.parent.password === value;
    }),
});

const Signup = () => {
  const classes = useStyles();
  const history = useHistory();
  const setToken = useAppStore((state) => state.setToken);

  const [
    signUp,
    { isLoading, reset: resetMutation, error: mutationError },
  ] = useMutation((formValues) => api.post('/signup', { ...formValues }), {
    onSuccess: ({ data: { token } }) => {
      history.push('/');
      setToken(token);
    },
  });

  const { values, handleSubmit, errors, setFieldValue } = useFormik({
    initialValues: {
      name: '',
      cpf: '',
      cellPhone: '',
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signInSchema,
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
          <TextField
            name="name"
            className={classes.input}
            label="Nome"
            type="email"
            variant="outlined"
            placeholder="Digite seu nome"
            margin="dense"
            autoComplete="name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon
                    color={errors.name ? 'error' : 'inherit'}
                  />
                </InputAdornment>
              ),
            }}
            value={values.name}
            onChange={handleChange}
            error={!!errors.name}
            fullWidth
            required
          />
          {errors.name && (
            <Typography
              variant="caption"
              className={classes.errorMessage}
              color="error"
            >
              {errors.name}
            </Typography>
          )}

          <FormControl
            className={classes.input}
            fullWidth
            required
            margin="dense"
            variant="outlined"
          >
            <InputLabel htmlFor="cpf" shrink>
              CPF
            </InputLabel>
            <OutlinedInput
              name="cpf"
              type="text"
              inputComponent={IMaskInput}
              labelWidth={60}
              placeholder="Digite seu CPF"
              startAdornment={
                <InputAdornment position="start">
                  <BrandingWatermarkOutlinedIcon
                    color={errors.cpf ? 'error' : 'inherit'}
                  />
                </InputAdornment>
              }
              inputProps={{
                mask: '000.000.000-00',
                onAccept: (value) =>
                  handleChange({ target: { name: 'cpf', value } }),
              }}
              value={values.cpf}
              error={!!errors.cpf}
            />
          </FormControl>
          {errors.cpf && (
            <Typography
              variant="caption"
              className={classes.errorMessage}
              color="error"
            >
              {errors.cpf}
            </Typography>
          )}

          <FormControl
            className={classes.input}
            fullWidth
            required
            margin="dense"
            variant="outlined"
          >
            <InputLabel htmlFor="cellPhone" shrink>
              Celular
            </InputLabel>
            <OutlinedInput
              name="cellPhone"
              inputComponent={IMaskInput}
              labelWidth={60}
              placeholder="Digite seu celular"
              startAdornment={
                <InputAdornment position="start">
                  <PhoneIphoneIcon
                    color={errors.cellPhone ? 'error' : 'inherit'}
                  />
                </InputAdornment>
              }
              inputProps={{
                mask:
                  values.cellPhone.length > 14
                    ? '(00) 00000-0000'
                    : '(00) 0000-0000[0]',
                onAccept: (value) =>
                  handleChange({ target: { name: 'cellPhone', value } }),
              }}
              onChange={handleChange}
              value={values.cellPhone}
              error={!!errors.cellPhone}
            />
          </FormControl>
          {errors.cellPhone && (
            <Typography
              variant="caption"
              className={classes.errorMessage}
              color="error"
            >
              {errors.cellPhone}
            </Typography>
          )}

          <TextField
            name="email"
            className={classes.input}
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
            name="confirmEmail"
            className={classes.input}
            label="Confirme o e-mail"
            type="email"
            variant="outlined"
            placeholder="Confirme seu e-mail"
            margin="dense"
            autoComplete="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon
                    color={errors.confirmEmail ? 'error' : 'inherit'}
                  />
                </InputAdornment>
              ),
            }}
            value={values.confirmEmail}
            onChange={handleChange}
            error={!!errors.confirmEmail}
            fullWidth
            required
          />
          {errors.confirmEmail && (
            <Typography
              variant="caption"
              className={classes.errorMessage}
              color="error"
            >
              {errors.confirmEmail}
            </Typography>
          )}

          <TextField
            name="password"
            className={classes.input}
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

          <TextField
            name="confirmPassword"
            className={classes.input}
            label="Confirme a senha"
            type="password"
            variant="outlined"
            placeholder="Confirme sua senha"
            margin="dense"
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon
                    color={errors.confirmPassword ? 'error' : 'inherit'}
                  />
                </InputAdornment>
              ),
            }}
            value={values.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            fullWidth
            required
          />
          {errors.confirmPassword && (
            <Typography
              variant="caption"
              className={classes.errorMessage}
              color="error"
            >
              {errors.confirmPassword}
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
