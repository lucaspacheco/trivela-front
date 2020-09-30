import React from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  Grid,
  makeStyles,
  InputAdornment,
  FormHelperText,
  FormControl,
  Typography,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { SportsSoccerOutlined as SportsSoccerOutlinedIcon } from '@material-ui/icons';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash.throttle';
import axios from 'axios';

import RenderImg from 'components/RenderImg';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  inputRoot: {
    '&[class*="MuiOutlinedInput-root"][class*="MuiOutlinedInput-marginDense"]': {
      paddingLeft: '1.4rem',
    },
  },
}));

const AutoComplete = ({ className, error, onOptionChange }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);

  const fetch = React.useMemo(
    () =>
      throttle(async (request, callback) => {
        const { data } = await axios.get(`/cartola?q=${request.input}`);
        callback(data);
      }, 500),
    [],
  );

  React.useEffect(() => {
    onOptionChange(value);
  }, [value]);

  React.useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <FormControl fullWidth variant="outlined">
      <Autocomplete
        classes={{ inputRoot: classes.inputRoot }}
        getOptionLabel={(option) =>
          typeof option === 'string' ? option : option.nome
        }
        filterOptions={(x) => x}
        options={options}
        noOptionsText="Nenhum time encontrado"
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={value}
        onChange={(event, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            className={className}
            error={!!error}
            label="Pesquise seu time no Cartola"
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SportsSoccerOutlinedIcon
                    color={error ? 'error' : 'inherit'}
                  />
                </InputAdornment>
              ),
            }}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password',
            }}
            placeholder="Digite o nome do seu time"
            variant="outlined"
            fullWidth
            required
          />
        )}
        renderOption={(option) => {
          const matches = match(option.nome, inputValue);
          const parts = parse(option.nome, matches);

          return (
            <Grid container alignItems="center">
              <Grid item>
                <RenderImg
                  className={classes.icon}
                  src={option.url_escudo_svg}
                  width={32}
                  height={32}
                  alt={`Escudo do cartola do time ${option.nome}`}
                />
              </Grid>
              <Grid item xs>
                {parts.map((part) => (
                  <span
                    key={part.text}
                    style={{ fontWeight: part.highlight ? 700 : 400 }}
                  >
                    {part.text.toUpperCase()}
                  </span>
                ))}

                <Typography variant="body2" color="textSecondary">
                  {`Cartoleiro: ${option.nome_cartola}`}
                </Typography>
              </Grid>
            </Grid>
          );
        }}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
};

AutoComplete.propTypes = {
  className: PropTypes.string.isRequired,
  error: PropTypes.string,
  onOptionChange: PropTypes.func.isRequired,
};

AutoComplete.defaultProps = {
  error: '',
};

export default AutoComplete;
