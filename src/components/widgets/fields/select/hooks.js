import isEqual from 'lodash/isEqual';
import update from 'immutability-helper';
import { useCallback, useMemo } from 'react';

export const increase = (value) => value + 1;

export default ({
  onChange: change,
  className,
  disabled,
  id,
  label,
  ...props
}) => {
  const check = useCallback(
    (stack, { label, value }, index) => {
      const selected = isEqual(value, props.value);

      return update(stack, {
        ...(selected && { value: { $set: index } }),
        options: { $push: [{ value: index, label }] },
      });
    },
    [props.value]
  );
  const { options, value } = useMemo(
    () => props.options.reduce(check, { options: [], value: '' }),
    [props.options, check]
  );
  const { error, helperText } = useMemo(
    () => ({
      helperText: props.error || props.helperText,
      error: !!props.error,
    }),
    [props.error, props.helperText]
  );
  const onChange = useCallback(
    (event) => console.log('onChange();', event, change),
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
