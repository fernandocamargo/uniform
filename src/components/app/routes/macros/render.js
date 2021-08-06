import { string } from 'yup';
import { useCallback, useMemo } from 'react';
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
  const memo = useMemo(
    () => [
      {
        component: Text,
        name: 'memo',
        validation: string().trim().min(10).max(50).required(),
      },
    ],
    []
  );
  const onSubmit = useCallback(
    (data) => console.log('submit();', { data }),
    []
  );
  const {
    components: {
      fields: { email: Email, password: Password },
    },
    values,
  } = useForm({ fields, onSubmit });
  const {
    components: {
      fields: { memo: Memo },
    },
    ...second
  } = useForm({ fields: memo, onSubmit });
  const third = useForm({ fields, onSubmit });
  const {
    components: { form: Form },
  } = useForm({ fields, onSubmit });

  return (
    <>
      <Metatags>
        <title>Macros</title>
      </Metatags>
      <div>
        <h1>Macros</h1>
        <pre>{JSON.stringify(values, null, 2)}</pre>
        <hr />
        <Email label="Please, provide your e-mail" />
        <hr />
        <pre>{JSON.stringify(second.values, null, 2)}</pre>
        <hr />
        <Memo label="Please, provide your name" />
        <Password label="Please, provide your password">lol</Password>
        <hr />
        <pre>{JSON.stringify(third.values, null, 2)}</pre>
        <Form />
        <p>LOL</p>
      </div>
    </>
  );
};
