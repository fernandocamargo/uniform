import { forwardRef } from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

import use from './hooks';

export const renderOption = ({ label, ...option }, index) => (
  <MenuItem key={index} {...option}>
    {label}
  </MenuItem>
);

export default forwardRef((props, ref) => {
  const {
    className,
    disabled,
    error,
    helperText,
    label,
    onChange,
    options,
    value,
  } = use(props);

  return (
    <FormControl className={className} disabled={disabled} error={error}>
      <InputLabel>{label}</InputLabel>
      <Select label={label} onChange={onChange} ref={ref} value={value}>
        {options.map(renderOption)}
      </Select>
      {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
});
