import compose from 'lodash/flowRight';
import { withTheme } from '@mui/styles';

import * as statics from './statics';
import render from './render';
import withStyle from './style';

export const enhance = compose(withTheme, withStyle);

export default enhance(Object.assign(render, statics));
