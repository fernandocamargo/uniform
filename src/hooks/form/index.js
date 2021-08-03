import get from 'lodash/get';
import intersection from 'lodash/intersection';
import update from 'immutability-helper';
import { createElement, createRef, useCallback, useMemo, useRef } from 'react';
import { useFormik } from 'formik';

import { extract, getValidationSchema } from './helpers';

export default ({ onSubmit, ...settings }) => {
  const { initialValues, validationSchema, ...state } = useMemo(
    () =>
      update(
        settings.fields.reduce(extract, {
          refs: {
            buttons: { reset: createRef(), submit: createRef() },
            fields: {},
          },
          initialValues: {},
          order: [],
          validationSchema: {},
        }),
        { validationSchema: { $apply: getValidationSchema } }
      ),
    [settings.fields]
  );
  const order = useRef(state.order);
  const refs = useRef(state.refs);
  const {
    isValid: valid,
    resetForm: reset,
    dirty,
    setStatus,
    status,
    submitForm,
    validateForm,
    ...formik
  } = useFormik({
    initialStatus: { debugging: get(settings, 'debugging', false) },
    validateOnBlur: get(settings, 'validateOnBlur', false),
    validateOnChange: get(settings, 'validateOnChange', false),
    validateOnMount: true,
    initialValues,
    onSubmit,
    validationSchema,
  });
  const format = useCallback(
    (stack, field) => {
      const {
        errors: { [field.name]: error },
        values: { [field.name]: value },
      } = formik;
      const {
        current: {
          fields: { [field.name]: ref },
        },
      } = refs;
      const onChange = (next) => formik.setFieldValue(field.name, next, false);
      const props = update(field, {
        ...(stack.debugging && { error: { $set: error } }),
        onChange: { $set: onChange },
        ref: { $set: ref },
        value: { $set: value },
      });
      const instance = {
        focus() {
          console.log('focus();', ref.current);

          return instance;
        },
        error(reason) {
          formik.setFieldError(field.name, reason);

          return instance;
        },
      };

      return update(stack, {
        fields: {
          unordered: { [field.name]: { $set: instance } },
          ordered: { $push: [props] },
        },
      });
    },
    [formik]
  );
  const original = useMemo(() => !dirty, [dirty]);
  const { debugging, fields } = useMemo(
    () =>
      settings.fields.reduce(format, {
        fields: { ordered: [], unordered: {} },
        debugging: get(status, 'debugging', false),
      }),
    [settings.fields, format, status]
  );
  const analyze = useCallback(
    (report) => {
      const errors = Object.keys(report);

      return !errors.length ? submitForm() : Promise.reject(errors);
    },
    [submitForm]
  );
  const debug = useCallback((errors) => {
    const invalid = intersection(order.current, errors);

    return console.log('debug();', { invalid });
  }, []);
  const submit = useCallback(
    (event) => {
      event.preventDefault();
      setStatus({ debugging: true });

      return validateForm().then(analyze).catch(debug);
    },
    [analyze, debug, setStatus, validateForm]
  );
  const render = useCallback((stack, { component, ...field }) => {
    const element = createElement(component, field);

    return update(stack, { elements: { [field.name]: { $set: element } } });
  }, []);
  const { components, elements } = useMemo(
    () => fields.ordered.reduce(render, { components: {}, elements: {} }),
    [fields.ordered, render]
  );

  return update(formik, {
    components: { $set: components },
    debugging: { $set: debugging },
    elements: { $set: elements },
    original: { $set: original },
    reset: { $set: reset },
    submit: { $set: submit },
    valid: { $set: valid },
  });
};
