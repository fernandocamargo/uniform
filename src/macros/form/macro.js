const { exit } = require('process');
const isEqual = require('lodash/isEqual');
const { createMacro } = require('babel-plugin-macros');

function macro({
  babel: {
    types: {
      identifier,
      importDeclaration,
      importSpecifier,
      isObjectPattern,
      stringLiteral,
    },
  },
  state: {
    file: { path: program },
  },
  references: { default: references },
}) {
  const aliases = references.reduce((stack, reference, index) => {
    console.log({ index });

    reference.parentPath.parentPath.traverse({
      Identifier(path) {
        if (path.findParent(isObjectPattern) && isEqual(path.key, 'value')) {
          console.log('===>', path.node.name);
        }
      },
    });

    return stack;
  }, {});

  exit(1);

  return program.traverse({
    ImportDeclaration(path) {
      if (path.node.source.value.endsWith('/macros/form/macro')) {
        path.parentPath.pushContainer(
          'body',
          importDeclaration(
            [importSpecifier(identifier('useForm'), identifier('useForm'))],
            stringLiteral('hooks')
          )
        );
      }
    },
    JSXElement(path) {
      if (
        ['Email', 'Name', 'Password'].includes(
          path.node.openingElement.name.name
        )
      ) {
        path.replaceWith(
          stringLiteral(`<${path.node.openingElement.name.name} />`)
        );
      }
    },
  });
}

module.exports = createMacro(macro);
