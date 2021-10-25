import { forwardRef, useCallback } from 'react';
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  TextField,
} from '@mui/material';

import use from './hooks';

export default forwardRef((props, ref) => {
  const {
    // autoComplete,
    className,
    disabled,
    error,
    helperText,
    id,
    label,
    onChange,
    onInputChange,
    options,
    // value,
  } = use(props);
  const renderInput = useCallback(
    (props) => <TextField label={label} {...props} />,
    [label]
  );

  return (
    <FormControl className={className} disabled={disabled} error={error}>
      <Autocomplete
        id={id}
        onChange={onChange}
        onInputChange={onInputChange}
        options={options}
        renderInput={renderInput}
        autoComplete
      />
      {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
});
