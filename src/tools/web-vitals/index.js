import isFunction from 'lodash/isFunction';

export default (log) => {
  const print = (call) => call(log);
  const connect = (reports) => Object.values(reports).forEach(print);

  return isFunction(log) && import('web-vitals').then(connect);
};
