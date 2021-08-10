import noop from 'lodash/noop';
import { func, node, number, oneOfType, string } from 'prop-types';

export const defaultProps = {
  onChange: noop,
  value: '',
};

export const displayName = 'Fields/Text';

export const propTypes = {
  className: string.isRequired,
  error: node,
  id: string.isRequired,
  label: node,
  onChange: func,
  value: oneOfType([number.isRequired, string.isRequired]),
};
