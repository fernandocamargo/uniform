import { useCallback, useEffect, useMemo, useState } from 'react';

export default (
  { onChange: change, className, disabled, id, label, value, ...props },
  ref
) => {
  const [autoFocus, setAutoFocus] = useState(props.autoFocus);
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

  useEffect(() => {
    const { current: element } = ref;
    const blur = () => setAutoFocus(false);
    const focus = () => setAutoFocus(true);

    element.addEventListener('blur', blur, false);
    element.addEventListener('focus', focus, false);

    return () => {
      element.removeEventListener('blur', blur, false);
      element.removeEventListener('focus', focus, false);
    };
  }, [ref]);

  return {
    inputProps: { autoFocus },
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
