import update from 'immutability-helper';
import { object } from 'yup';

export const extract = (stack, { name, validation, value }) =>
  update(stack, {
    initialValues: { [name]: { $set: value } },
    validationSchema: { [name]: { $set: validation } },
  });

export const getValidationSchema = (validation) => object().shape(validation);
