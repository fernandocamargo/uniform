import { object, string } from 'yup';
import { Helmet as Metatags } from 'react-helmet';
import { Button } from '@mui/material';

import useForm from '../../../../macros/form/macro';
import { Form } from 'components/widgets';
import { Password, Text } from 'components/widgets/fields';

export const validationSchema = object().shape({
  email: string()
    .trim()
    .min(3, 'Sorry, not enough (at least 3 characters).')
    .max(50, 'Sorry, way too much (maximum of 50 characters).')
    .email('Must be a valid email address.')
    .required('This field is required.'),
  password: string()
    .trim()
    .min(3, 'Sorry, not enough (at least 3 characters).')
    .max(50, 'Sorry, way too much (maximum of 50 characters).')
    .required('This field is required.'),
});

const initialValues = {
  email: 'f.camargo@expertlead.de',
  password: '',
};

const onSubmit = (data) => console.log('submit();', { data });

export default ({ className }) => {
  const {
    fields: { email, password },
    dirty,
    form,
    resetForm,
    values,
  } = useForm({ initialValues, onSubmit, validationSchema });

  return (
    <>
      <Metatags>
        <title>Login</title>
      </Metatags>
      <div className={className}>
        <Form form={form}>
          <fieldset>
            <legend>Login</legend>
            <div aria-roledescription="field">
              <Text field={email} label="Email" />
            </div>
            <div aria-roledescription="field">
              <Password field={password} label="Pasword" />
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
