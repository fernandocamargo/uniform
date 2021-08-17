import { object, string } from 'yup';
import { Helmet as Metatags } from 'react-helmet';
import { Button } from '@material-ui/core';

import useForm from '../../../../macros/form/macro';
import { Password, Text } from 'components/widgets/fields';

export const validationSchema = object().shape({
  email: string()
    .trim()
    .min(3)
    .max(50)
    .email()
    .required('This field is required.'),
  password: string().trim().min(3).max(50).required('This field is required.'),
});

const initialValues = {
  name: 'Fernando Camargo',
  email: 'f.camargo@expertlead.de',
  password: '',
};

const onSubmit = (data) => console.log('submit();', { data });

export default () => {
  const {
    fields: { name, email, password },
    dirty,
    form,
    resetForm,
    values,
  } = useForm({ initialValues, onSubmit, validationSchema });

  return (
    <>
      <Metatags>
        <title>Basic</title>
      </Metatags>
      <div>
        <h1>Basic</h1>
        <form form={form}>
          <fieldset>
            <legend>Login</legend>
            <Text field={name} label="Full name" />
            <Text field={email} label="Email" />
            <Password field={password} label="Pasword" />
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
          </fieldset>
        </form>
        <hr />
        <pre>{JSON.stringify(values, null, 2)}</pre>
        <p>
          <a href="//google.com" rel="noreferrer" target="_blank">
            google.com
          </a>
        </p>
      </div>
    </>
  );
};
