import { forwardRef } from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

import use from './hooks';

export const Option = ({ label, value }) => (
  <MenuItem value={value}>{label}</MenuItem>
);

export const renderOption = (option) => (
  <Option key={option.value} {...option} />
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

  console.log({ options, value });

  return (
    <FormControl className={className} disabled={disabled} error={error}>
      <InputLabel>{label}</InputLabel>
      <Select label={label} onChange={onChange} value={value}>
        {options.map(renderOption)}
      </Select>
      {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
});
