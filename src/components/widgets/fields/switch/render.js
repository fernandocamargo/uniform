import { forwardRef } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
} from '@mui/material';

import use from './hooks';

export default forwardRef((props, inputRef) => {
  const { className, disabled, error, helperText, id, label, onChange, value } =
    use(props);

  return (
    <FormControl className={className} disabled={disabled} error={error}>
      <FormControlLabel
        control={<Switch checked={value} id={id} onChange={onChange} />}
        label={label}
        inputRef={inputRef}
        htmlFor={id}
      />
      {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
});
