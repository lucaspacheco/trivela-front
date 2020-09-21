import React from 'react';
import { Paper, Button, Typography, CircularProgress } from '@material-ui/core';
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

import AuthPageLayout from 'components/AuthPageLayout';
import useAppStore from 'components/App/store';
import { useNotify } from 'components/Notification';
import TextInput from 'components/TextInput';

import api from 'services/api';
import useStyles from './styles';
import validationSchema from './validationSchema';

const Profile = () => {
  const classes = useStyles();
  const { userInfo, setUserInfo } = useAppStore();
  const notify = useNotify();

  const [
    updateProfile,
    { isLoading, reset: resetMutation, error: mutationError },
  ] = useMutation(
    (formValues) => api.post('/update-profile', { ...formValues }),
    {
      onSuccess: ({ data }) => {
        notify({
          type: 'success',
          message: 'Dados alterados com sucesso',
        });
        setUserInfo(data);
      },
    },
  );

  const { values, handleSubmit, errors, setFieldValue, resetForm } = useFormik({
    initialValues: {
      name: '',
      cpf: '',
      cellPhone: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: (formValues) => {
      updateProfile({ ...formValues });
    },
  });

  React.useEffect(() => {
    if (Object.keys(userInfo).length > 1) {
      resetForm({
        values: {
          name: userInfo.name,
          cpf: userInfo.cpf,
          cellPhone: userInfo.cellPhone,
          email: userInfo.email,
          password: '',
          confirmPassword: '',
        },
      });
    }
  }, [userInfo]);

  const handleChange = ({ target: { name, value } }) =>
    setFieldValue(name, value);

  return (
    <AuthPageLayout>
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
            disabled
            fullWidth
            required
          />

          <TextInput
            autoComplete="cellPhone"
            className={classes.input}
            error={errors.cellPhone}
            inputComponent={IMaskInput}
            inputProps={{
              mask:
                values.cellPhone?.length > 14
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
            error={errors.name}
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
            Alterar dados
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

export default Profile;
