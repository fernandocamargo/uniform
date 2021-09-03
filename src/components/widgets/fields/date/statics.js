import noop from 'lodash/noop';
import {
  bool,
  func,
  node,
  number,
  oneOf,
  oneOfType,
  shape,
  string,
} from 'prop-types';

export const defaultProps = {
  InputAdornmentProps: { position: 'end' },
  disabled: false,
  inputVariant: 'outlined',
  onChange: noop,
  value: '',
  variant: 'outlined',
};

export const displayName = 'Fields/Date';

export const propTypes = {
  InputAdornmentProps: shape({
    position: oneOf(['end', 'start']).isRequired,
  }).isRequired,
  className: string.isRequired,
  disabled: bool,
  error: node,
  id: string.isRequired,
  inputVariant: string.isRequired,
  label: node,
  onChange: func,
  value: oneOfType([number.isRequired, string.isRequired]),
};
