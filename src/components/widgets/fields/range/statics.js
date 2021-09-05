import noop from 'lodash/noop';
import { bool, func, node, number, string } from 'prop-types';

export const defaultProps = {
  disabled: false,
  max: 100,
  min: 0,
  onChange: noop,
  step: 1,
  value: 0,
};

export const displayName = 'Fields/Range';

export const propTypes = {
  className: string.isRequired,
  disabled: bool,
  error: node,
  id: string.isRequired,
  label: node,
  max: number,
  min: number,
  onChange: func,
  step: number,
  value: number,
};
