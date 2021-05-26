import React, { useState } from "react";
import {
  Paper,
  Button,
  Typography,
  CircularProgress,
  Divider
} from "@material-ui/core";
import { useMutation } from "react-query";
import {
  PersonOutlineOutlined as PersonOutlineIcon,
  EmailOutlined as EmailOutlinedIcon,
  LockOutlined as LockOutlinedIcon,
  BrandingWatermarkOutlined as BrandingWatermarkOutlinedIcon,
  PhoneIphone as PhoneIphoneIcon
} from "@material-ui/icons";
import { useFormik } from "formik";
import { IMaskInput } from "react-imask";

import AuthPageLayout from "components/AuthPageLayout";
import useAppStore from "components/App/store";
import { useNotify } from "components/Notification";
import TextInput from "components/TextInput";

import api from "services/api";
import useStyles from "./styles";
import validationSchema from "./validationSchema";

const Profile = () => {
    const classes = useStyles();
    const { userInfo, setUserInfo, deviceInfo } = useAppStore();
    const login = useAppStore((s) => s.login);
    const notify = useNotify();
    const [user, setUser] = useState(!!userInfo.name);
    console.log(deviceInfo)
    const [
      updateProfile,
      { isLoading, reset: resetMutation, error: mutationError }
    ] = useMutation(
      (formValues) =>
        user ? api.post("/user/customer", {
            ...formValues
          },
          {
            headers: {
              "x-access-token": deviceInfo.token
            }
          }) :
          api.put("/user/${userInfo.id}", { ...formValues }
            ,
            {
              headers: {
                "x-access-token": userInfo.token
              }
            }),
      {
        onSuccess: ({ data }) => {
          if (!user && (data && data.auth)) {
            login(data);
            setUser(true);
          }
          notify({
            type: "success",
            message: user ? "Dados alterados com sucesso" : "Dados cadastrados com sucesso"
          });
          setUserInfo(data);
        }
      }
    );

    const { values, handleSubmit, errors, setFieldValue, resetForm } = useFormik({
      initialValues: {
        name: "",
        cpf: "",
        phone: deviceInfo ? deviceInfo.number : '',
        email: ""
        /*actualPassword: '',
        newPassword: '',
        confirmPassword: '',*/
      },
      validationSchema,
      validateOnChange: false,
      onSubmit: (formValues) => {
        updateProfile({ ...formValues });
      }
    });

    React.useEffect(() => {
      if (Object.keys(userInfo).length > 1) {
        resetForm({
          values: {
            name: userInfo.name,
            cpf: userInfo.cpf,
            phone: userInfo.phone || deviceInfo.number,
            email: userInfo.email
            /*actualPassword: '',
            newPassword: '',
            confirmPassword: '',*/
          }
        });
      }
    }, [userInfo]);

    const handleChange = ({ target: { name, value } }) =>
      setFieldValue(name, value);

    return (
      <AuthPageLayout heading={user ? "Alterar dados" : "Completar Dados"}>
        {!user && <Typography align="center">
          Para ter acesso a todos os recursos do <strong>Trivela</strong>, <br />é obrigatório <strong>Completar o seu
          cadastro</strong>.
          <br />
          <br />
        </Typography>}
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
                <PersonOutlineIcon color={errors.name ? "error" : "inherit"} />
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
                mask: "000.000.000-00",
                onAccept: (value) =>
                  handleChange({ target: { name: "cpf", value } })
              }}
              margin="dense"
              name="cpf"
              onChange={handleChange}
              label="CPF"
              placeholder="Digite seu CPF"
              startAdornment={
                <BrandingWatermarkOutlinedIcon
                  color={errors.cpf ? "error" : "inherit"}
                />
              }
              variant="outlined"
              value={values.cpf}

              fullWidth
              required
            />

            <TextInput
              autoComplete="phone"
              className={classes.input}
              error={errors.phone}
              inputComponent={IMaskInput}
              inputProps={{
                mask:
                  values.phone?.length > 14
                    ? "+55 (00) 00000-0000"
                    : "+55 (00) 0000-0000[0]",
                onAccept: (value) =>
                  handleChange({ target: { name: "phone", value } })
              }}
              margin="dense"
              name="phone"
              onChange={handleChange}
              label="Celular"
              disabled
              placeholder="Digite seu celular"
              startAdornment={
                <PhoneIphoneIcon color={errors.phone ? "error" : "inherit"} />
              }
              variant="outlined"
              value={values.phone}
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
                <EmailOutlinedIcon color={errors.email ? "error" : "inherit"} />
              }
              type="email"
              variant="outlined"
              value={values.email}
              fullWidth
              required
            />

            <Divider className={classes.divider} />
            {/* <Typography>
            Se desejar alterar sua senha, preencha os campos abaixo:
          </Typography>

         <TextInput
            autoComplete="password"
            className={classes.input}
            error={errors.actualPassword}
            margin="dense"
            name="actualPassword"
            onChange={handleChange}
            label="Senha atual"
            placeholder="Digite sua senha atual"
            startAdornment={
              <LockOutlinedIcon
                color={errors.actualPassword ? 'error' : 'inherit'}
              />
            }
            type="password"
            variant="outlined"
            value={values.actualPassword}
            fullWidth
          />

          <TextInput
            autoComplete="password"
            className={classes.input}
            error={errors.newPassword}
            margin="dense"
            name="newPassword"
            onChange={handleChange}
            label="Nova senha"
            placeholder="Digite sua nova senha"
            startAdornment={
              <LockOutlinedIcon
                color={errors.newPassword ? 'error' : 'inherit'}
              />
            }
            type="password"
            variant="outlined"
            value={values.newPassword}
            required={!!values.actualPassword}
            fullWidth
          />

          <TextInput
            autoComplete="password"
            className={classes.input}
            error={errors.confirmPassword}
            margin="dense"
            name="confirmPassword"
            onChange={handleChange}
            label="Confirme a nova senha"
            placeholder="Confirme sua nova senha"
            startAdornment={
              <LockOutlinedIcon
                color={errors.confirmPassword ? 'error' : 'inherit'}
              />
            }
            type="password"
            variant="outlined"
            value={values.confirmPassword}
            required={!!values.actualPassword}
            fullWidth
          />*/}

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
                  style={{ position: "absolute" }}
                />
              )}
            </Button>
          </Paper>
        </form>
      </AuthPageLayout>
    );
  }
;

export default Profile;
