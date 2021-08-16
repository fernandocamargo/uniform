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

export default forwardRef((props, ref) => {
  const {
    className,
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
    <FormControl className={className} error={error} variant={variant}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={onClick} onMouseDown={onMouseDown} edge="end">
              {visible ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
      {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
});
