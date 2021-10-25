import { useCallback, useMemo } from 'react';

export default ({
  onChange: change,
  className,
  disabled,
  id,
  label,
  name,
  value,
  variant,
  ...props
}) => {
  const autoComplete = useMemo(
    () => props.autoComplete || name,
    [props.autoComplete, name]
  );
  const { error, helperText } = useMemo(
    () => ({
      helperText: props.error || props.helperText,
      error: !!props.error,
    }),
    [props.error, props.helperText]
  );
  const onChange = useCallback(
    ({ target: { value } }) => change(value),
    [change]
  );

  return {
    autoComplete,
    className,
    disabled,
    error,
    helperText,
    id,
    label,
    onChange,
    value,
    variant,
  };
};
