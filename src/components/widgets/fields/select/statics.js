import noop from 'lodash/noop';
import {
  arrayOf,
  bool,
  func,
  node,
  number,
  oneOfType,
  shape,
  string,
} from 'prop-types';

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
  marks: oneOfType([
    bool,
    arrayOf(
      shape({
        label: node.isRequired,
        value: number.isRequired,
      }).isRequired
    ),
  ]),
  max: number,
  min: number,
  onChange: func,
  step: number,
  value: number,
};
