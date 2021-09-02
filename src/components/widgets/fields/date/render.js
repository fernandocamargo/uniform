import { forwardRef } from 'react';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  InputAdornment,
  OutlinedInput,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import use from './hooks';

export default forwardRef((props, inputRef) => {
  const {
    className,
    disabled,
    error,
    helperText,
    id,
    label,
    onChange,
    onClick,
    onMouseDown,
    type,
    value,
    variant,
    visible,
  } = use(props);

  return (
    <FormControl
      className={className}
      disabled={disabled}
      error={error}
      variant={variant}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        inputRef={inputRef}
        onChange={onChange}
        type={type}
        value={value}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              disabled={disabled}
              onClick={onClick}
              onMouseDown={onMouseDown}
              edge="end"
            >
              {visible ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
      {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
});
