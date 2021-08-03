import update from 'immutability-helper';
import { object } from 'yup';
import { createRef } from 'react';

export const extract = (
  stack,
  { disabled = false, name, validation, value }
) => {
  const ref = createRef();

  return update(stack, {
    ...(!disabled && {
      validationSchema: { [name]: { $set: validation } },
    }),
    refs: { fields: { [name]: { $set: ref } } },
    initialValues: { [name]: { $set: value } },
    order: { $push: [name] },
  });
};

export const getValidationSchema = (validation) => object().shape(validation);
