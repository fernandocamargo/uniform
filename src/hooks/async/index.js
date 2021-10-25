import { useCallback, useEffect, useRef, useState } from 'react';

import { attempt, fail, getInitialState, succeed } from './reducers';

import { Validity } from './helpers';

export default (connect) => {
  const controller = useRef(new AbortController());
  const [state, setState] = useState(getInitialState());
  const resolve = useCallback(
    (...params) => {
      const { check, expire } = new Validity();

      controller.current.signal.addEventListener('abort', expire);

      setState(attempt({ params }));

      return new Promise((resolve, reject) =>
        check(connect(...params))
          .then((response) => {
            setState(succeed(response));

            return resolve(response);
          })
          .catch((error) => {
            setState(fail(error));

            return reject(error);
          })
          .finally(() =>
            controller.current.signal.removeEventListener('abort', expire)
          )
      );
    },
    [connect]
  );

  useEffect(() => () => controller.current.abort(), []);

  return { ...state, resolve };
};
