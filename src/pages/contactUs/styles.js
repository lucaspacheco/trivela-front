import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  form: {
    maxWidth: '400px',
    width: '100%',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    maxWidth: '500px',
    width: '100%',
  },
  input: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: `${theme.spacing(2)}px 0 ${theme.spacing(0.5)}px`,
  },
  errorMessage: {
    alignSelf: 'flex-start',
    marginBottom: theme.spacing(1),
  },
  mutationErrorMessage: {
    alignSelf: 'flex-start',
    marginTop: theme.spacing(1.5),
  },
}));
