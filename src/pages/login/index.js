import React, { useState } from 'react';
import { Link as  useHistory } from "react-router-dom";
import {
  Box,
  Paper,
  Button,
  Typography,
} from "@material-ui/core";
import {PhoneIphone as PhoneIphoneIcon} from "@material-ui/icons";
import TextInput from "components/TextInput";
import useStyles from "./styles";
import RenderImg from "components/RenderImg";
import { IMaskInput } from "react-imask";
import logo from "assets/logo.svg";
import useAppStore from "components/App/store";
import api from 'services/api'

const PreSign = ({setDevice, retornaValor}) => {  
  const classes = useStyles();
  const [phone, setPhone] = useState()

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!phone){
      return false;
    }
            
     api.post("/auth/login", {
        number: phone
     })
    .then(res=>{
      if(!res.data.token){
        return false
      }   
      setDevice(res.data);
      retornaValor(phone);
    })
    .catch(error=>{
      console.log(error)
    })
  }

  return (
    <>
      <form className={classes.form}>
        <div>
          <TextInput
          type="text"
          margin="dense"
          name ="phone"
          id = "phone"
          label="Celular"
          placeholder= "Digite seu celular"
          fullWidth
          variant="outlined"
          value={phone}
          required
          inputComponent={IMaskInput}
          inputProps={{
            mask:
              "+55 (00) 00000-0000"
          }}
          startAdornment={<PhoneIphoneIcon/>}
          onChange={e =>setPhone(e.target.value)}
          />

          <Typography color={"primary"} align={"center"}>
            <small>
            Você receberá um código de acesso
            </small>
          </Typography>

          <Button
          className={classes.button}
          color="primary"
          variant="contained"
          type="submit"
          fullWidth
          onClick={handleSubmit}
          >
          Receber
          </Button>
        </div>
      </form>
    </>
  );
}

const ValidateToken = ({device}) => { 
    const history = useHistory();
    const classes = useStyles();  
    const [pincode, setPincode] = useState()
    const login = useAppStore((state) => state.login);


   const handleLogin = (e) => {  
      e.preventDefault()
      api.post("/auth/login/validate", 
        {pincode:pincode}, 
        {headers: {"x-access-token":device.token}            
      })
      .then(res => {  
        console.log(res) 

        res.data.user ? 
        login(res.data.auth, res.data.user) 
        : 
        login(res.data.auth);
        history.push("/profile");
      })
     .catch(error=>{
        console.log(error)         
      })
    }
    
    return (
      <>
          <form className={classes.form}>
            <div>
              <TextInput
                type="text"
                margin="dense"
                name ="token"
                id = "token"
                label="Token"
                placeholder= "Código enviado por SMS"
                fullWidth
                variant="outlined"
                value={pincode}
                required
                inputComponent={IMaskInput}
                inputProps={{
                mask:
                 "000000"
                }}
                onChange={e =>setPincode(e.target.value)}
              />

               <Typography color={"primary"} align={"center"}><small>Insira o código que recebeu em seu celular</small></Typography>
              
              <Button
                className={classes.button}
                color="primary"
                variant="contained"
                type="submit"
                fullWidth
                onClick={handleLogin}
              >
                Validar
              </Button>
            </div> 
          </form>     
        </>     
    );
   }

const Login = () => {   
    const classes = useStyles();
    const [device, setDevice] = useState('')
    
    
    return (
      <>
        <Box
         minHeight="100%"
         display="flex"
         alignItems="center"
         justifyContent="center"
         paddingX="1.2rem"
         paddingY="2.4rem"
         className={classes.box}
        >
        <Paper       
        className={classes.paper}
        elevation={2}>
          <RenderImg
            className={classes.logo}
            src={logo}
            al="Escudo de time de futebol escrito Trivela e embaixo Smart Club"
          />
          {!device ?
          <>
            <Typography align={"center"} variant="subtitle1">
               Para entrar ou se cadastrar informe um número de celular:
            </Typography>
            <PreSign setDevice={setDevice} />
          </>
          :
           <>
          <Typography align={"center"} variant="subtitle1">
            Insira o Token que recebeu em seu celular:
          </Typography>
            <ValidateToken device={device} />
          </>
          }
          <br />
          <Typography 
          align={"center"} 
          variant="caption"
          >
          *<strong>FIQUE TRANQUILO</strong>! 
          usaremos seu número apenas para enviar <br />
          o token de acesso (que é bem mais
          seguro que senhas fixas) <br />
          ou notificar transações financeiras importantes.
          </Typography>
      </Paper>
    </Box>
    </>
    );
  }
  
  export default Login;