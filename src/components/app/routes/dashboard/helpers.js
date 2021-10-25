import moment from 'moment';

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
