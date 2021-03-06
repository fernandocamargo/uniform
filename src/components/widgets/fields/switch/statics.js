import noop from 'lodash/noop';
import { bool, func, node, string } from 'prop-types';

export const defaultProps = {
  disabled: false,
  onChange: noop,
  value: false,
};

export const displayName = 'Fields/Switch';

export const propTypes = {
  className: string.isRequired,
  disabled: bool,
  error: node,
  id: string.isRequired,
  label: node,
  onChange: func,
  value: bool,
};
