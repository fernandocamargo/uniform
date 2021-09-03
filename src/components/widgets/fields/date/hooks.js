import { useCallback, useMemo } from 'react';

export default ({
  onChange: change,
  InputAdornmentProps,
  className,
  disabled,
  id,
  inputVariant,
  label,
  value,
  variant,
  ...props
}) => {
  const { error, helperText } = useMemo(
    () => ({
      helperText: props.error || props.helperText,
      error: !!props.error,
    }),
    [props.error, props.helperText]
  );
  const onChange = useCallback((value) => change(value), [change]);

  return {
    InputAdornmentProps,
    className,
    disabled,
    error,
    helperText,
    id,
    inputVariant,
    label,
    onChange,
    value,
    variant,
  };
};
