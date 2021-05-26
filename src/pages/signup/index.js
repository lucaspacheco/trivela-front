import * as Yup from "yup";
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
  PhoneIphone as PhoneIphoneIcon,
  SecurityOutlined as CodeIcon
} from "@material-ui/icons";
import { useFormik } from "formik";
import { IMaskInput } from "react-imask";

import useAppStore from "components/App/store";
import TextInput from "components/TextInput";

import api from "services/api";
import useStyles from "./styles";
import { cellPhoneRegex, tokenRegex, validationMessages } from "../../utils/consts";


const PreSign = ({ setDevice }) => {
    const classes = useStyles();
    const [message, setMessage] = useState();
    const validationSchema = Yup.object().shape({
      number: Yup.string()
        .required(validationMessages.required)
        .matches(cellPhoneRegex, validationMessages.invalidField("Celular"))
    });

    const [
      signDevice,
      { isLoading, reset: resetMutation, error: mutationError }
    ] = useMutation(
      (formValues) =>
        api.post("/devices", {
          number: `+55${formValues.number.replace(/\D/g, "")}`
        }),
      {
        onMutate: ()=>{
          setMessage()
        },
        onSuccess: ({ data }) => {
          setDevice(data);
        },
        onError: (error, variables, snapshotValue) => {
          if(error.response.status === 409) setMessage(<>Se você já se registrou <Link component={RouterLink} to="/login">
            Faça login!
          </Link></>)
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
          autoComplete="cellPhone"
          className={classes.input}
          error={errors.number}
          inputComponent={IMaskInput}
          inputProps={{
            mask:
              values.number.length > 14
                ? "(00) 00000-0000"
                : "(00) 0000-0000[0]",
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
        <Typography color={"primary"} align={"center"}><small>informe o celular para receber seu codigo de
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
    const loginDevice = useAppStore((state) => state.loginDevice);

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
        api.post("/auth/validate-device", {
          validationCode: formValues.token,
          deviceId: device.id
        })
      ,
      {
        onSuccess: ({ data }) => {
          loginDevice(data);
          history.push("/profile");
        },
        onError: (error, variables, snapshotValue) => {
          if(error.response.status === 404) setMessage(<>Código errado! Verifique ou <Link component={RouterLink} to="/login">
            recomece
          </Link></>)
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
const Signup = () => {
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
        {!device ?
          <PreSign setDevice={setDevice} />
          :
          <ValidateToken device={device} />}
        <Typography className={classes.signIn} variant="caption">
          Já tem uma conta?{" "}
          <Link component={RouterLink} to="/login">
            Faça login!
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};


export default Signup;
