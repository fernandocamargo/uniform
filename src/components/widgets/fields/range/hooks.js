import isUndefined from 'lodash/isUndefined';
import times from 'lodash/times';
import { useCallback, useMemo } from 'react';

export const increase = (value) => value + 1;

export default ({
  onChange: change,
  className,
  disabled,
  getAriaValueText,
  id,
  label,
  max,
  min,
  step,
  value,
  ...props
}) => {
  const marks = useMemo(() => {
    const amount = Math.ceil(max / step);
    const fulfill = (index) => {
      const value = increase(index) * step;

      return { label: value, value };
    };

    return !isUndefined(props.marks) ? props.marks : times(amount, fulfill);
  }, [props.marks, max, step]);
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
    getAriaValueText,
    helperText,
    id,
    label,
    marks,
    max,
    min,
    onChange,
    step,
    value,
  };
};
