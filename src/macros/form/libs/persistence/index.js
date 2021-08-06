const { isObjectPattern } = require('@babel/types');
const first = require('lodash/first');
const get = require('lodash/get');
const isEqual = require('lodash/isEqual');
const last = require('lodash/last');
const update = require('immutability-helper');
const { encrypt } = require('./helpers');

module.exports = class {
  constructor({ state = {}, filename, index }) {
    this.hash = [encrypt(filename), index].join('');
    this.state = state;
  }

  check = (path) => {
    const { filter, state } = this;
    const eligible =
      isEqual(path.key, 'value') &&
      path.findParent(isObjectPattern) &&
      filter(path);

    this.state = eligible
      ? update(state, { [eligible.alias]: { $set: eligible.value } })
      : state;
  };

  filter = (path) => {
    const { hash, trace } = this;
    const location = trace(path);
    const { name: root } = first(location);
    const { name: alias, key } = last(location);
    const value = { hash, key };
    const eligible = isEqual(root, 'components');

    return eligible && { alias, value };
  };

  get = () => this.state;

  identify = (value) => [this.hash, value].filter(Boolean).join('.');

  trace = (path, stack = []) => {
    const { trace } = this;
    const value = get(path, ['node', 'name']);
    const key = get(path, ['parentPath', 'node', 'key', 'name']);
    const name = value || key;
    const current = name ? update(stack, { $unshift: [{ key, name }] }) : stack;
    const parent = path.findParent(isObjectPattern);

    return !parent ? current : trace(parent, current);
  };
};
