import { forwardRef, useMemo } from 'react';
import { TextField } from '@material-ui/core';

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
    value,
    variant,
  } = use(props);
  const classes = useMemo(() => ({ root: className }), [className]);

  return (
    <TextField
      classes={classes}
      disabled={disabled}
      error={error}
      helperText={helperText}
      id={id}
      inputRef={inputRef}
      label={label}
      onChange={onChange}
      value={value}
      variant={variant}
    />
  );
});
