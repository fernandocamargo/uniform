import { forwardRef, useMemo } from 'react';
import { TextField } from '@material-ui/core';

import use from './hooks';

export default forwardRef((props, ref) => {
  const { className, error, helperText, id, label, onChange, value, variant } =
    use(props);
  const classes = useMemo(() => ({ root: className }), [className]);

  return (
    <TextField
      classes={classes}
      error={error}
      helperText={helperText}
      id={id}
      label={label}
      onChange={onChange}
      ref={ref}
      value={value}
      variant={variant}
    />
  );
});
