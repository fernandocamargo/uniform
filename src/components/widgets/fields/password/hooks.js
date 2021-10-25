import { useCallback, useMemo, useState } from 'react';

import { reverse } from 'helpers/boolean';

export default ({
  onChange: change,
  className,
  disabled,
  id,
  label,
  name,
  onMouseDown,
  value,
  variant,
  ...props
}) => {
  const [visible, setVisible] = useState(false);
  const autoComplete = useMemo(
    () => props.autoComplete || name,
    [props.autoComplete, name]
  );
  const type = useMemo(() => (visible ? 'text' : 'password'), [visible]);
  const { error, helperText } = useMemo(
    () => ({
      helperText: props.error || props.helperText,
      error: !!props.error,
    }),
    [props.error, props.helperText]
  );
  const onClick = useCallback(() => setVisible(reverse), []);
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
    onClick,
    onMouseDown,
    type,
    value,
    variant,
  };
};
