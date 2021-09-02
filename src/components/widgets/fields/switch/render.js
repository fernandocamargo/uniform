import { forwardRef } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
} from '@material-ui/core';

import use from './hooks';

export default forwardRef((props, inputRef) => {
  const { className, error, helperText, id, label, onChange, value } =
    use(props);

  return (
    <FormControl className={className} error={error}>
      <FormControlLabel
        control={
          <Switch checked={value} inputRef={inputRef} onChange={onChange} />
        }
        id={id}
        label={label}
      />
      {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
});
