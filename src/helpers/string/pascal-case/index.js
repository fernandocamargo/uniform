import startCase from 'lodash/startCase';
import lowerCase from 'lodash/lowerCase';

export default (object) => startCase(lowerCase(object));
