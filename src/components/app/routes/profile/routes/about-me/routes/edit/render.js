import { object, string } from 'yup';
import { Helmet as Metatags } from 'react-helmet';
import { Button } from '@mui/material';

import useForm from '../../../../../../../../macros/form/macro';
import { Form } from 'components/widgets';
import { Text } from 'components/widgets/fields';

export const validationSchema = object().shape({
  'first-name': string()
    .trim()
    .min(3, 'Sorry, not enough (at least 3 characters).')
    .max(50, 'Sorry, way too much (maximum of 50 characters).')
    .required('This field is required.'),
  'last-name': string()
    .trim()
    .min(3, 'Sorry, not enough (at least 3 characters).')
    .max(50, 'Sorry, way too much (maximum of 50 characters).')
    .required('This field is required.'),
  title: string()
    .trim()
    .min(3, 'Sorry, not enough (at least 3 characters).')
    .max(50, 'Sorry, way too much (maximum of 50 characters).')
    .required('This field is required.'),
});

export const initialValues = {
  'first-name': 'Fernando',
  'last-name': 'Camargo Del Buono',
  title: 'Full Snack Developer',
};

export const onSubmit = (data) => console.log('submit();', { data });

export default ({ className }) => {
  const {
    fields: { 'first-name': firstName, 'last-name': lastName, title },
    dirty,
    form,
    resetForm,
    values,
  } = useForm({ initialValues, onSubmit, validationSchema });

  return (
    <>
      <Metatags>
        <title>Profile &raquo; About me &raquo; Edit</title>
      </Metatags>
      <div className={className}>
        <Form form={form}>
          <fieldset>
            <legend>My CV/About Me</legend>
            <div aria-roledescription="field">
              <Text field={firstName} label="First name" />
            </div>
            <div aria-roledescription="field">
              <Text field={lastName} label="Last name" />
            </div>
            <div aria-roledescription="field">
              <Text field={title} label="Title" />
            </div>
            <div aria-roledescription="controls">
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
              <Button
                disabled={!dirty}
                onClick={resetForm}
                color="primary"
                type="reset"
              >
                Reset
              </Button>
            </div>
          </fieldset>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </Form>
      </div>
    </>
  );
};
