import { boolean, number, object, string } from 'yup';
import { useCallback, useMemo } from 'react';
import { Helmet as Metatags } from 'react-helmet';
import { Button, IconButton, Tooltip } from '@mui/material';
import { Help } from '@mui/icons-material';

import useForm from '../../../../macros/form/macro';
import { Form } from 'components/widgets';
import {
  Autocomplete,
  Date,
  Range,
  Select,
  Switch,
} from 'components/widgets/fields';

import { isValidDate } from './helpers';

export const API_URL = 'https://api.geoapify.com/v1/geocode/autocomplete';

export const API_KEY = 'bfa210bd8efe424cabaa54445ae8c0c9';

export const ACCESSIBILITIES = [
  { label: 'Unlimited travel', value: 'UNLIMITED' },
  { label: 'Limited travel (kickoff/neighboring cities)', value: 'LIMITED' },
  { label: 'Current city only', value: 'CURRENT_CITY' },
  { label: 'Remote only', value: 'REMOTE_ONLY' },
];

export const toJSON = (response) => response.json();

export const extract = ({ properties: value }) => {
  const { city, country, state } = value;

  return { label: `${city} - ${state}, ${country}`, value };
};

export const format = ({ features }) => features.map(extract);

export const searchByKeywords = (keywords) => {
  const text = window.encodeURIComponent(keywords.trim());
  const params = new URLSearchParams({
    apiKey: API_KEY,
    type: 'city',
    text,
  }).toString();
  const url = [API_URL, params].join('?');
  const resolve = () =>
    window.fetch(url, { method: 'GET' }).then(toJSON).then(format);

  return !!text ? resolve() : Promise.resolve([]);
};

export const validationSchema = object().shape({
  available: boolean().oneOf([true], 'This field must be checked.'),
  date: string().nullable().test(isValidDate),
  availability: number()
    .min(15, 'Your availability must be between 15 and 40 hours.')
    .max(40, 'Your availability must be between 15 and 40 hours.'),
  accessibility: string()
    .oneOf(
      ['CURRENT_CITY', 'REMOTE_ONLY'],
      'You need to pick between "CURRENT_CITY" and "REMOTE_ONLY".'
    )
    .required('This field is required.'),
});

export const initialValues = {
  available: false,
  date: null,
  availability: 5,
  accessibility: '',
  city: null,
};

export const onSubmit = (data) => console.log('submit();', { data });

export default ({ className }) => {
  const {
    fields: { accessibility, availability, available, city, date },
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
            {!!values.available && (
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
            )}
            <div aria-roledescription="field">
              <Select
                field={accessibility}
                label="Accessibility"
                options={ACCESSIBILITIES}
              />
            </div>
            <div aria-roledescription="field">
              <Autocomplete
                field={city}
                label="City"
                onSearch={searchByKeywords}
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
