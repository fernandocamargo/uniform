import { useCallback, useMemo } from 'react';

export default ({
  onChange: change,
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
  const onChange = useCallback(
    ({ target: { checked } }) => change(checked),
    [change]
  );

  return { className, disabled, error, helperText, id, label, onChange, value };
};
