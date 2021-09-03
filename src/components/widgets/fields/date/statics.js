import noop from 'lodash/noop';
import Moment from 'moment';
import { bool, func, instanceOf, node, string } from 'prop-types';

export const defaultProps = {
  disabled: false,
  onChange: noop,
  value: null,
};

export const displayName = 'Fields/Date';

export const propTypes = {
  className: string.isRequired,
  disabled: bool,
  error: node,
  id: string.isRequired,
  label: node,
  onChange: func,
  value: instanceOf(Moment),
};
