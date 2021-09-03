import { useMemo } from 'react';

export default ({
  onChange,
  className,
  disabled,
  id,
  label,
  value,
  ...props
}) => {
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
    label,
    onChange,
    value,
  };
};
