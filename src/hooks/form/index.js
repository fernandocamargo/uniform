import get from 'lodash/get';
import update from 'immutability-helper';
import { useCallback, useRef } from 'react';
import { useFormik } from 'formik';

import { createRefsFrom } from './helpers';

export default ({ hash, ...settings }) => {
  const refs = useRef(createRefsFrom(settings));
  const form = update(settings, {
    $merge: {
      initialStatus: { debugging: get(settings, 'debugging', false) },
      validateOnBlur: get(settings, 'validateOnBlur', false),
      validateOnChange: get(settings, 'validateOnChange', false),
      validateOnMount: true,
    },
  });
  const formik = useFormik(form);
  const {
    status: { debugging },
    dirty,
    errors,
    setFieldValue,
    setStatus,
    submitForm,
    validateForm,
    values,
  } = formik;
  const analyze = useCallback(
    (report) => {
      const reason = Object.keys(report);

      return !reason.length ? submitForm() : Promise.reject(reason);
    },
    [submitForm]
  );
  const debug = useCallback(([reason]) => {
    const element = get(refs, ['current', reason, 'current'], document.body);

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
    element.focus();

    return element;
  }, []);
  const submit = useCallback(
    (event) => {
      event.preventDefault();
      setStatus({ debugging: true });

      return validateForm().then(analyze).catch(debug);
    },
    [analyze, debug, setStatus, validateForm]
  );
  const API = {
    [hash]: {
      $set: { debugging, dirty, errors, refs, setFieldValue, submit, values },
    },
    fields: { $set: {} },
  };

  return update(formik, API);
};
