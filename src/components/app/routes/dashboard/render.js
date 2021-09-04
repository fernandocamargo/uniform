import moment from 'moment';
import { object, boolean, string } from 'yup';
import { useMemo } from 'react';
import { Helmet as Metatags } from 'react-helmet';
import { Button } from '@mui/material';

import useForm from '../../../../macros/form/macro';
import { Form } from 'components/widgets';
import { Date, Switch } from 'components/widgets/fields';

export const isValidDate = (
  _,
  { parent: { available }, originalValue: value, createError, path }
) => {
  const now = moment();
  const lastWeek = moment().subtract(7, 'days');
  const nextWeek = moment().add(7, 'days');
  const [since, until] = available ? [lastWeek, now] : [now, nextWeek];
  const valid = !!value && value.isBetween(since, until);
  const period = available ? 'last' : 'next';
  const message = `You must choose a date within the ${period} 7 days.`;

  return valid || createError({ message, path });
};

export const validationSchema = object().shape({
  available: boolean().oneOf([true], 'This field must be checked.'),
  date: string().nullable().test(null, null, isValidDate),
});

const initialValues = {
  available: false,
  date: null,
};

const onSubmit = (data) => console.log('submit();', { data });

export default ({ className }) => {
  const {
    fields: { available, date },
    dirty,
    form,
    resetForm,
    values,
  } = useForm({ initialValues, onSubmit, validationSchema });
  const labels = useMemo(
    () => ({
      available: 'Yes, I am open for new projects!',
      date: `Will be open ${values.available ? 'until' : 'from'}`,
    }),
    [values]
  );

  return (
    <>
      <Metatags>
        <title>Dashboard</title>
      </Metatags>
      <div className={className}>
        <Form form={form}>
          <fieldset>
            <legend>Hey, are you open for new challenges?</legend>
            <div aria-roledescription="field">
              <Switch field={available} label={labels.available} />
            </div>
            <div aria-roledescription="field">
              <Date field={date} label={labels.date} />
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
