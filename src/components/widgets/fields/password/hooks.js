import { useCallback, useMemo, useState } from 'react';

import { reverse } from 'helpers/boolean';

export default ({
  onChange: change,
  className,
  id,
  label,
  onMouseDown,
  value,
  variant,
  ...props
}) => {
  const [visible, setVisible] = useState(false);
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
    className,
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
