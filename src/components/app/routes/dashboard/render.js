import { object, boolean } from 'yup';
import { Helmet as Metatags } from 'react-helmet';
import { Button } from '@material-ui/core';

import useForm from '../../../../macros/form/macro';
import { Switch } from 'components/widgets/fields';

export const validationSchema = object().shape({
  available: boolean().oneOf([true], 'Field must be checked'),
});

const initialValues = {
  available: false,
};

const onSubmit = (data) => console.log('submit();', { data });

export default ({ className }) => {
  const {
    fields: { available },
    dirty,
    form,
    resetForm,
    values,
  } = useForm({ initialValues, onSubmit, validationSchema });

  return (
    <>
      <Metatags>
        <title>Dashboard</title>
      </Metatags>
      <div className={className}>
        <form form={form}>
          <fieldset>
            <legend>Hey, are you open for new challenges?</legend>
            <div aria-roledescription="field">
              <Switch
                field={available}
                label="Yes, I am open for new projects!"
              />
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
        </form>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </div>
    </>
  );
};
