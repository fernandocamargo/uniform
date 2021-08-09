const { createHash } = require('crypto');
const { isObjectPattern } = require('@babel/types');
const get = require('lodash/get');
const update = require('immutability-helper');

function encrypt(string) {
  return createHash('md5').update(string).digest('hex');
}

function identify(path) {
  const key = get(path, ['parentPath', 'node', 'key', 'name']);
  const name = get(path, ['node', 'name']);

  return { key, name };
}

function trace(path, stack = []) {
  const { key, name = key } = identify(path);
  const current = name ? update(stack, { $unshift: [{ key, name }] }) : stack;
  const parent = path.findParent(isObjectPattern);

  return !parent ? current : trace(parent, current);
}

module.exports = { encrypt, identify, trace };
