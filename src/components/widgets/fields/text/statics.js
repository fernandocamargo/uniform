import noop from 'lodash/noop';
import { bool, func, node, number, oneOfType, string } from 'prop-types';

export const defaultProps = {
  disabled: false,
  onChange: noop,
  value: '',
  variant: 'outlined',
};

export const displayName = 'Fields/Text';

export const propTypes = {
  className: string.isRequired,
  disabled: bool,
  error: node,
  id: string.isRequired,
  label: node,
  onChange: func,
  value: oneOfType([number.isRequired, string.isRequired]),
};
