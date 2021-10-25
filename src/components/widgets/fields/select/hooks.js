import { useCallback, useMemo } from 'react';

export default ({
  onChange: change,
  className,
  disabled,
  id,
  label,
  options,
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
  const onChange = useCallback(
    ({ target: { value } }) => change(value),
    [change]
  );

  return {
    className,
    disabled,
    error,
    helperText,
    id,
    label,
    onChange,
    options,
    value,
  };
};
