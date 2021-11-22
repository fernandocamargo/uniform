import noop from 'lodash/noop';
import { any, bool, func, node, string } from 'prop-types';

export const defaultProps = {
  disabled: false,
  onChange: noop,
};

export const displayName = 'Fields/Collection';

export const propTypes = {
  className: string.isRequired,
  disabled: bool,
  error: node,
  id: string.isRequired,
  label: node,
  onChange: func,
  value: any,
};
