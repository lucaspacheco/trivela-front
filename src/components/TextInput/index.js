/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  InputLabel,
  FormHelperText,
  OutlinedInput,
  InputAdornment,
} from '@material-ui/core';

const variantComponent = {
  outlined: OutlinedInput,
};

const TextInput = ({
  autoComplete,
  className,
  fullWidth,
  error,
  inputComponent,
  inputProps,
  label,
  margin,
  name,
  onChange,
  placeholder,
  required,
  startAdornment,
  type,
  value,
  variant,
}) => {
  const InputComponent = variantComponent[variant];

  return (
    <FormControl
      className={className}
      fullWidth={fullWidth}
      margin={margin}
      required={required}
      variant={variant}
    >
      {label && (
        <InputLabel error={!!error} htmlFor={name}>
          {label}
        </InputLabel>
      )}
      <InputComponent
        autoComplete={autoComplete}
        error={!!error}
        inputComponent={inputComponent}
        inputProps={inputProps}
        label={label}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        startAdornment={
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        }
        type={type}
        value={value}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
};

TextInput.propTypes = {
  autoComplete: PropTypes.string,
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  error: PropTypes.string,
  inputComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.oneOf([undefined]),
  ]),
  inputProps: PropTypes.shape({}),
  label: PropTypes.string,
  margin: PropTypes.oneOf(['dense', 'none', 'normal']),
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  startAdornment: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.oneOf([undefined]),
  ]),
  type: PropTypes.string,
  value: PropTypes.any.isRequired,
  variant: PropTypes.oneOf(['outlined']),
};

TextInput.defaultProps = {
  autoComplete: 'off',
  className: '',
  fullWidth: false,
  error: '',
  inputComponent: undefined,
  inputProps: undefined,
  label: '',
  margin: 'dense',
  name: '',
  placeholder: '',
  required: false,
  startAdornment: undefined,
  type: 'text',
  variant: 'outlined',
};

export default TextInput;
