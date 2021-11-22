const { createMacro } = require('babel-plugin-macros');
const { Program, References } = require('./helpers');

function macro({
  state: {
    file: { path: program },
    filename,
  },
  references: { default: references },
}) {
  return [
    program.traverse(Program.enhance),
    references.forEach(new References({ filename }).enhance),
  ];
}

module.exports = createMacro(macro);
