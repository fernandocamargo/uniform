import * as statics from './statics';
import render from './render';
import withStyle from './style';

export default withStyle(Object.assign(render, statics));
