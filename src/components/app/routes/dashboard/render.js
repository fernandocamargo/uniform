import moment from 'moment';
import { boolean, number, object, string } from 'yup';
import { useCallback, useMemo } from 'react';
import { Helmet as Metatags } from 'react-helmet';
import { Button, IconButton, Tooltip } from '@mui/material';
import { Help } from '@mui/icons-material';

import useForm from '../../../../macros/form/macro';
import { Form } from 'components/widgets';
import { Date, Range, Switch } from 'components/widgets/fields';

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
  availability: number()
    .min(15, 'Your availability must be between 15 and 40 hours.')
    .max(40, 'Your availability must be between 15 and 40 hours.'),
  available: boolean().oneOf([true], 'This field must be checked.'),
  date: string().nullable().test(isValidDate),
});

const initialValues = {
  availability: 5,
  available: false,
  date: null,
};

const onSubmit = (data) => console.log('submit();', { data });

export default ({ className }) => {
  const {
    fields: { availability, available, date },
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
  const Title = useCallback(
    () => (
      <>
        <p>Please input the best estimated date of your next availability.</p>
        <p>If you are unsure of a specific date, leave it blank.</p>
      </>
    ),
    []
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
              <Tooltip title={<Title />} placement="right" arrow>
                <IconButton aria-label="Help">
                  <Help />
                </IconButton>
              </Tooltip>
            </div>
            <div aria-roledescription="field">
              <Range
                field={availability}
                label={
                  <>
                    <span>Hours per week: </span>
                    <strong>{values.availability}</strong>
                  </>
                }
                max={50}
                min={5}
                step={5}
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
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </Form>
      </div>
    </>
  );
};
