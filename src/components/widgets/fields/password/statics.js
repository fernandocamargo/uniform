import noop from 'lodash/noop';
import { func, node, number, oneOfType, string } from 'prop-types';

import { prevent } from 'helpers/events';

export const defaultProps = {
  onChange: noop,
  onMouseDown: prevent,
  value: '',
  variant: 'outlined',
};

export const displayName = 'Fields/Password';

export const propTypes = {
  className: string.isRequired,
  error: node,
  id: string.isRequired,
  label: node,
  onChange: func,
  onMouseDown: func,
  value: oneOfType([number.isRequired, string.isRequired]),
};
