import { forwardRef, useCallback } from 'react';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/lab';

import use from './hooks';

export default forwardRef((props, inputRef) => {
  const {
    className,
    disabled,
    error,
    helperText,
    id,
    inputFormat,
    label,
    mask,
    onChange,
    value,
  } = use(props);
  const renderInput = useCallback(
    (input) => (
      <TextField {...input} error={error} helperText={helperText} id={id} />
    ),
    [error, helperText, id]
  );

  return (
    <DatePicker
      className={className}
      disabled={disabled}
      inputFormat={inputFormat}
      inputRef={inputRef}
      label={label}
      mask={mask}
      renderInput={renderInput}
      onChange={onChange}
      value={value}
    />
  );
});
