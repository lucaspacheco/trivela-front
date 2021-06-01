import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Button,
  Typography,
  Link,
  CircularProgress
} from "@material-ui/core";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useMutation } from "react-query";
import {
  EmailOutlined as EmailOutlinedIcon,
  LockOutlined as LockOutlinedIcon, PhoneIphone as PhoneIphoneIcon
} from "@material-ui/icons";
import { useFormik } from "formik";
import * as Yup from "yup";

import useAppStore from "components/App/store";
import TextInput from "components/TextInput";
import api from "services/api";
import logo from "assets/logo.svg";
import { phoneRegex, tokenRegex, validationMessages } from "utils/consts";
import RenderImg from "components/RenderImg";
import useStyles from "./styles";
import { IMaskInput } from "react-imask";

const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email("E-mail inválido")
    .required(validationMessages.required),
  password: Yup.string().required(validationMessages.required)
});
const PreSign = ({ setDevice }) => {
    const classes = useStyles();
    const [message, setMessage] = useState();
    const validationSchema = Yup.object().shape({
      number: Yup.string()
        .required(validationMessages.required)
        .matches(phoneRegex, validationMessages.invalidField("Celular"))
    });

    const [
      signDevice,
      { isLoading, reset: resetMutation, error: mutationError }
    ] = useMutation(
      (formValues) =>
        api.post("/auth/login", {
          number: `+${formValues.number.replace(/\D/g, "")}`
        }),
      {
        onMutate: () => {
          setMessage();
        },
        onSuccess: ({ data }) => {
          setDevice(data);
        },
        onError: (error, variables, snapshotValue) => {
          if (error.response.status === 409) setMessage(<>Se você não se registrou <Link component={RouterLink}
                                                                                         to="/signup">
            Se inscreva!
          </Link></>);
        }
      }
    );

    const { values, handleSubmit, errors, setFieldValue } = useFormik({
      initialValues: {
        number: ""
      },
      validationSchema,
      validateOnChange: false,
      onSubmit: (formValues) => {
        signDevice({ ...formValues });
      }
    });

    const handleChange = ({ target: { name, value } }) =>
      setFieldValue(name, value);

    useEffect(() => {
      if (mutationError && !message) {
        setMessage(mutationError.message);
      }
    }, [mutationError]);

    return (
      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        <TextInput
          autoComplete="phone"
          className={classes.input}
          error={errors.number}
          inputComponent={IMaskInput}
          inputProps={{
            mask:
              values.number.length > 14
                ? "+55 (00) 00000-0000"
                : "+55 (00) 0000-0000[0]",
            onAccept: (value) =>
              handleChange({ target: { name: "number", value } })
          }}
          margin="dense"
          name="number"
          onChange={handleChange}
          label="Celular"
          placeholder="Digite seu celular"
          startAdornment={
            <PhoneIphoneIcon color={errors.number ? "error" : "inherit"} />
          }
          variant="outlined"
          value={values.number}
          fullWidth
          required
        />
        <Typography color={"primary"} align={"center"}><small>você receberá um código de
          acesso</small></Typography>

        {message && (
          <Typography color="error" className={classes.mutationErrorMessage}>
            {message}
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
          Receber
          {isLoading && (
            <CircularProgress
              size="3.2rem"
              style={{ position: "absolute" }}
            />
          )}
        </Button>
      </form>
    );
  }
;
const ValidateToken = ({ device }) => {
    const classes = useStyles();
    const [message, setMessage] = useState();
    const history = useHistory();
    const login = useAppStore((state) => state.login);

    const validationSchema = Yup.object().shape({
      token: Yup.string()
        .required(validationMessages.required)
        .matches(tokenRegex, validationMessages.invalidField("Token"))
    });

    const [
      signUp,
      { isLoading, reset: resetMutation, error: mutationError }
    ] = useMutation(
      (formValues) =>
        api.post("/auth/login/validate", {
            pincode: formValues.token
          },
          {
            headers: {
              "x-access-token": device.token
            }
          })
      ,
      {
        onSuccess: ({ data }) => {
          data.user ? login(data.auth.token, data.user) : login(data.auth.token);
          history.push("/profile");
        },
        onError: (error, variables, snapshotValue) => {
          if (error.response.status === 404) setMessage(<>Código errado! Verifique ou <Link component={RouterLink}
                                                                                            to="/login">
            recomece
          </Link></>);
        }
      }
    );

    const { values, handleSubmit, errors, setFieldValue } = useFormik({
      initialValues: {
        token: ""
      },
      validationSchema,
      validateOnChange: false,
      onSubmit: (formValues) => {
        signUp({ ...formValues });
      }
    });

    const handleChange = ({ target: { name, value } }) =>
      setFieldValue(name, value);

    useEffect(() => {
      if (mutationError) {
        setMessage(mutationError.message);
      }
    }, [mutationError]);

    return (
      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        <TextInput
          className={classes.input}
          error={errors.token}
          inputComponent={IMaskInput}
          inputProps={{
            mask: "00000",
            onAccept: (value) =>
              handleChange({ target: { name: "token", value } })
          }}
          margin="dense"
          name="token"
          onChange={handleChange}
          label="Token"
          placeholder="Código enviado por SMS"
          startAdornment={
            <PhoneIphoneIcon color={errors.token ? "error" : "inherit"} />
          }
          variant="outlined"
          value={values.token}
          fullWidth
          required
        />

        {message && (
          <Typography color="error" className={classes.mutationErrorMessage}>
            {message}
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
          Validar
          {isLoading && (
            <CircularProgress
              size="3.2rem"
              style={{ position: "absolute" }}
            />
          )}
        </Button>
      </form>
    );
  }
;
const Login = () => {
  const classes = useStyles();
  const [device, setDevice] = useState();

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
      <Paper elevation={2} className={classes.paper}>
        <RenderImg
          className={classes.logo}
          src={logo}
          al="Escudo de time de futebol escrito Trivela e embaixo Smart Club"
        />
        <Typography align={"center"} variant="subtitle1">
          Para entrar ou cadastrar informe um nº de celular
        </Typography>
        {!device ?
          <PreSign setDevice={setDevice} />
          :
          <ValidateToken device={device} />}
        <br />
        <Typography align={"center"} variant="caption">
          *<strong>FIQUE TRANQUILO</strong>! usaremos seu nº apenas para enviar <br />o token de acesso (que é bem mais
          seguro que senhas fixas) <br />ou notificar transações financeiras importantes.
        </Typography>

      </Paper>
    </Box>
  );
};
export default Login;
