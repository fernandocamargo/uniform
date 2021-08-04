import get from 'lodash/get';
import noop from 'lodash/noop';
import update from 'immutability-helper';
import { useMemo } from 'react';
import { useFormik } from 'formik';

import { Text } from 'components/widgets/fields';

import { extract, getValidationSchema } from './helpers';

export default (settings) => {
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

  return update(formik, {
    components: { $set: { fields: { email: Text, password: Text } } },
  });
};
