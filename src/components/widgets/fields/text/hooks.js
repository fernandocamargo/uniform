import { useCallback, useMemo } from 'react';

export default ({
  onChange: change,
  className,
  id,
  label,
  value,
  variant,
  ...props
}) => {
  const onChange = useCallback(
    ({ target: { value } }) => change(value),
    [change]
  );
  const { error, helperText } = useMemo(
    () => ({
      helperText: props.error || props.helperText,
      error: !!props.error,
    }),
    [props.error, props.helperText]
  );

  return { className, error, helperText, id, label, onChange, value, variant };
};
