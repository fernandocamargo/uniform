import { useContext, useMemo } from 'react';
import { MuiPickersAdapterContext } from '@mui/lab';

export default ({
  onChange,
  className,
  disabled,
  id,
  inputFormat,
  label,
  mask,
  ...props
}) => {
  const { utils } = useContext(MuiPickersAdapterContext);
  const value = useMemo(() => utils.date(props.value), [props.value, utils]);
  const { error, helperText } = useMemo(
    () => ({
      helperText: props.error || props.helperText,
      error: !!props.error,
    }),
    [props.error, props.helperText]
  );

  return {
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
  };
};
