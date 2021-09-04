import { forwardRef, useCallback, useMemo } from 'react';
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
  const classes = useMemo(() => ({ root: className }), [className]);
  const renderInput = useCallback(
    (input) => (
      <TextField
        {...input}
        classes={classes}
        error={error}
        helperText={helperText}
        id={id}
      />
    ),
    [classes, error, helperText, id]
  );

  return (
    <DatePicker
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
