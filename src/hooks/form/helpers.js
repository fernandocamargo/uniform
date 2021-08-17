import update from 'immutability-helper';
import { createRef } from 'react';

export const create = (stack, name) =>
  update(stack, { [name]: { $set: createRef() } });

export const createRefsFrom = ({ initialValues: values }) =>
  Object.keys(values).reduce(create, {});
