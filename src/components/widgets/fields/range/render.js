import { forwardRef, useMemo } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Slider,
} from '@mui/material';

import use from './hooks';

export default forwardRef((props, ref) => {
  const {
    className,
    disabled,
    error,
    helperText,
    id,
    label,
    marks,
    max,
    min,
    onChange,
    step,
    value,
  } = use(props);
  const classes = useMemo(() => ({ root: className }), [className]);

  return (
    <FormControl className={className} disabled={disabled} error={error}>
      <FormControlLabel
        control={
          <Slider
            classes={classes}
            disabled={disabled}
            id={id}
            label={label}
            marks={marks}
            max={max}
            min={min}
            onChange={onChange}
            ref={ref}
            step={step}
            value={value}
          />
        }
        id={id}
        label={label}
      />
      {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
});
