import get from 'lodash/get';
import noop from 'lodash/noop';
import update from 'immutability-helper';
import { useCallback, useMemo } from 'react';
import { useFormik } from 'formik';

import { Form } from 'components/widgets';
import { Text } from 'components/widgets/fields';

import { extract, getValidationSchema } from './helpers';

export default ({ hash, ...settings }) => {
  const form = useMemo(() => {
    const debugging = get(settings, 'debugging', false);
    const defaults = settings.fields.reduce(extract, {
      initialStatus: { debugging },
      initialValues: {},
      onSubmit: get(settings, 'onSubmit', noop),
      validateOnBlur: get(settings, 'validateOnBlur', false),
      validateOnChange: get(settings, 'validateOnChange', false),
      validateOnMount: debugging,
      validationSchema: {},
    });
    const transformations = {
      validationSchema: { $apply: getValidationSchema },
    };

    return update(defaults, transformations);
  }, [settings]);
  const formik = useFormik(form);
  const { setStatus, submitForm, validateForm } = formik;
  const analyze = useCallback(
    () => (report) => {
      const errors = Object.keys(report);

      return !errors.length ? submitForm() : Promise.reject(errors);
    },
    [submitForm]
  );
  const debug = useCallback((errors) => console.log({ errors }), []);
  const validate = useCallback(
    () => validateForm().then(analyze).catch(debug),
    [analyze, debug, validateForm]
  );
  const submit = useCallback(
    (event) => {
      event.preventDefault();
      setStatus({ debugging: true });

      return validate();
    },
    [setStatus, validate]
  );

  return update(formik, {
    components: {
      $set: {
        fields: { email: Text, memo: Text, name: Text, password: Text },
        form: Form,
      },
    },
    ...(!!hash && { [hash]: { $set: { values: formik.values, submit } } }),
  });
};
