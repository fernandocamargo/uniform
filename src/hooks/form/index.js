import get from 'lodash/get';
import update from 'immutability-helper';
import { useCallback } from 'react';
import { useFormik } from 'formik';

export default ({ hash, ...settings }) => {
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
  const submit = useCallback(
    (event) => {
      const analyze = (report) => {
        const reason = Object.keys(report);

        return !reason.length ? submitForm() : Promise.reject(reason);
      };
      const debug = (reason) => console.log('error', reason);

      event.preventDefault();
      setStatus({ debugging: true });

      return validateForm().then(analyze).catch(debug);
    },
    [setStatus, submitForm, validateForm]
  );
  const API = {
    [hash]: {
      $set: { debugging, dirty, errors, setFieldValue, submit, values },
    },
    fields: { $set: {} },
  };

  return update(formik, API);
};
