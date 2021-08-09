import { object, string } from 'yup';
import { Helmet as Metatags } from 'react-helmet';

import useForm from '../../../../macros/form/macro';
import { Text } from 'components/widgets/fields';

export const validationSchema = object().shape({
  email: string().trim().min(3).max(255).email().required(),
  password: string().trim().min(10).max(50).required(),
});

const initialValues = {
  name: 'Fernando Camargo',
  email: 'f.camargo@expertlead.de',
  password: '1234',
};

const onSubmit = (data) => console.log('submit();', { data });

export default () => {
  const {
    fields: { name: fullName, email, password },
    form,
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
            <Text field={fullName} label="Please, provide your full name" />
            <Text field={email} label="Please, provide your e-mail" />
            <Text field={password} label="Please, provide your pasword" />
          </fieldset>
        </form>
        <hr />
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </div>
    </>
  );
};
