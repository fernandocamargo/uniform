import noop from 'lodash/noop';
import { bool, func, node, string } from 'prop-types';

export const defaultProps = {
  autoFocus: false,
  disabled: false,
  onChange: noop,
  value: false,
};

export const displayName = 'Fields/Switch';

export const propTypes = {
  autoFocus: bool,
  className: string.isRequired,
  disabled: bool,
  error: node,
  id: string.isRequired,
  label: node,
  onChange: func,
  value: bool,
};
