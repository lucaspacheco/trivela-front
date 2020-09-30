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
  disabled,
  fullWidth,
  error,
  inputComponent,
  inputProps,
  label,
  margin,
  multiline,
  name,
  onChange,
  placeholder,
  required,
  rows,
  rowsMax,
  startAdornment,
  type,
  value,
  variant,
}) => {
  const InputComponent = variantComponent[variant];

  return (
    <FormControl
      className={className}
      disabled={disabled}
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
        multiline={multiline}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        rowsMax={rowsMax}
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
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  error: PropTypes.string,
  inputComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.oneOf([undefined]),
  ]),
  inputProps: PropTypes.shape({}),
  label: PropTypes.string,
  margin: PropTypes.oneOf(['dense', 'none', 'normal']),
  multiline: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  rows: PropTypes.number,
  rowsMax: PropTypes.number,
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
  disabled: false,
  fullWidth: false,
  error: '',
  inputComponent: undefined,
  inputProps: undefined,
  label: '',
  margin: 'dense',
  multiline: false,
  name: '',
  placeholder: '',
  required: false,
  rows: undefined,
  rowsMax: undefined,
  startAdornment: undefined,
  type: 'text',
  variant: 'outlined',
};

export default TextInput;
