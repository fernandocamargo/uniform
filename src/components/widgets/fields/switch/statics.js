import noop from 'lodash/noop';
import { bool, func, node, string } from 'prop-types';

export const defaultProps = {
  onChange: noop,
  value: false,
};

export const displayName = 'Fields/Switch';

export const propTypes = {
  className: string.isRequired,
  error: node,
  id: string.isRequired,
  label: node,
  onChange: func,
  value: bool,
};
