import { string } from 'yup';
import { useCallback, useMemo } from 'react';
import { Helmet as Metatags } from 'react-helmet';

import { useForm } from 'hooks';
import { Text } from 'components/widgets/fields';

export default () => {
  const fields = useMemo(
    () => [
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
    ],
    []
  );
  const onSubmit = useCallback(
    (data) => console.log('submit();', { data }),
    []
  );
  const {
    elements: { name },
    debugging,
    submit,
    valid,
    values,
  } = useForm({ fields, onSubmit });

  return (
    <>
      <Metatags>
        <title>Basic example</title>
      </Metatags>
      <div>
        <h1>Basic example</h1>
        <pre>{JSON.stringify({ debugging, valid, values }, null, 2)}</pre>
        <button onClick={submit}>Submit</button>
        {name}
      </div>
    </>
  );
};
