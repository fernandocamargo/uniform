import noop from 'lodash/noop';
import { any, bool, func, node, number, string } from 'prop-types';

export const defaultProps = {
  disabled: false,
  latency: 250,
  onChange: noop,
};

export const displayName = 'Fields/Autocomplete';

export const propTypes = {
  className: string.isRequired,
  disabled: bool,
  error: node,
  id: string.isRequired,
  label: node,
  latency: number.isRequired,
  onChange: func,
  value: any,
};
