import get from 'lodash/get';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useAsync } from 'hooks';

import * as reducers from './reducers';

export default ({
  onChange: change,
  onSearch: search,
  className,
  disabled,
  id,
  label,
  latency,
  name,
  value,
  ...props
}) => {
  const timeout = useRef(null);
  const [state, setState] = useState(reducers.getInitialState());
  const { resolve: feed, ...feeding } = useAsync(search);
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
    (event, current) => {
      const next = get(current, 'value', null);

      change(next);

      return event;
    },
    [change]
  );
  const onInputChange = useCallback(
    (event, value) => {
      const trigger = () =>
        feed(value).then((options) => setState(reducers.set({ options })));

      window.clearTimeout(timeout.current);

      timeout.current = window.setTimeout(trigger, latency);

      return event;
    },
    [feed, latency]
  );

  useEffect(() => () => window.clearTimeout(timeout.current), []);

  return {
    autoComplete,
    className,
    disabled,
    error,
    feeding,
    helperText,
    id,
    label,
    onChange,
    onInputChange,
    value,
    ...state,
  };
};
