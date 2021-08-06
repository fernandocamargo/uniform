const { createHash } = require('crypto');

function encrypt(string) {
  return createHash('md5').update(string).digest('hex');
}

module.exports = { encrypt };
