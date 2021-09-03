import { forwardRef, useCallback } from 'react';
import { FormControl, FormHelperText, TextField } from '@mui/material';
import { DatePicker } from '@mui/lab';

import use from './hooks';

export default forwardRef((props, inputRef) => {
  const { disabled, error, helperText, id, label, onChange, value } =
    use(props);
  const renderInput = useCallback(
    (input) => <TextField error={error} id={id} {...input} />,
    [error, id]
  );

  return (
    <FormControl disabled={disabled} error={error}>
      <DatePicker
        inputRef={inputRef}
        label={label}
        renderInput={renderInput}
        onChange={onChange}
        value={value}
      />
      {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
});
