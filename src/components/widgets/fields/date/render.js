import { forwardRef } from 'react';
import { FormControl, FormHelperText } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';

import use from './hooks';

export default forwardRef((props, inputRef) => {
  const {
    InputAdornmentProps,
    className,
    disabled,
    error,
    helperText,
    inputVariant,
    label,
    onChange,
    value,
    variant,
  } = use(props);

  return (
    <FormControl
      className={className}
      disabled={disabled}
      error={error}
      variant={variant}
    >
      <KeyboardDatePicker
        InputAdornmentProps={InputAdornmentProps}
        inputVariant={inputVariant}
        format="MM/dd/yyyy"
        label={label}
        value={value}
        variant="inline"
        onChange={onChange}
        autoOk
      />
      {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
});
