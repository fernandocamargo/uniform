import { forwardRef } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
} from '@material-ui/core';

import use from './hooks';

export default forwardRef((props, inputRef) => {
  const { className, disabled, error, helperText, id, label, onChange, value } =
    use(props);

  return (
    <FormControl className={className} disabled={disabled} error={error}>
      <FormControlLabel
        control={<Switch checked={value} onChange={onChange} />}
        id={id}
        label={label}
        inputRef={inputRef}
      />
      {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
});
