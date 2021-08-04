import { string } from 'yup';
import { useCallback } from 'react';
import { Helmet as Metatags } from 'react-helmet';

import useForm from '../../../../macros/form/macro';
import { Text } from 'components/widgets/fields';

export const fields = [
  {
    component: Text,
    name: 'name',
    validation: string().trim().min(10).max(50).required(),
  },
  {
    component: Text,
    name: 'email',
    value: 'f.camargo',
    validation: string().trim().min(3).max(255).email().required(),
  },
  { component: Text, name: 'password', value: '1234' },
];

export default () => {
  const onSubmit = useCallback(
    (data) => console.log('submit();', { data }),
    []
  );
  const {
    components: {
      fields: { email: Email },
    },
    ...first
  } = useForm({ fields, onSubmit });
  const {
    components: {
      fields: { password: Password },
    },
    ...second
  } = useForm({ fields, onSubmit });

  return (
    <>
      <Metatags>
        <title>Macros</title>
      </Metatags>
      <div>
        <h1>Macros</h1>
        <pre>{JSON.stringify(first.values, null, 2)}</pre>
        <hr />
        <Email label="Please, provide your e-mail" />
        <hr />
        <pre>{JSON.stringify(second.values, null, 2)}</pre>
        <hr />
        <Password label="Please, provide your password">lol</Password>
      </div>
    </>
  );
};
