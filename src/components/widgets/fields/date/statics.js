import noop from 'lodash/noop';
import { bool, func, node, number, oneOfType, string } from 'prop-types';

import { prevent } from 'helpers/events';

export const defaultProps = {
  disabled: false,
  onChange: noop,
  onMouseDown: prevent,
  value: '',
  variant: 'outlined',
};

export const displayName = 'Fields/Date';

export const propTypes = {
  className: string.isRequired,
  disabled: bool,
  error: node,
  id: string.isRequired,
  label: node,
  onChange: func,
  onMouseDown: func,
  value: oneOfType([number.isRequired, string.isRequired]),
};
