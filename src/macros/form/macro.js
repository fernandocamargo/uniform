const { exit } = require('process');
const { createMacro } = require('babel-plugin-macros');

function macro({
  babel: {
    types: { identifier, importDeclaration, importSpecifier, stringLiteral },
  },
  state: {
    file: { path: program },
  },
}) {
  return (
    program.traverse({
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
          ['Email', 'Password'].includes(path.node.openingElement.name.name)
        ) {
          path.replaceWith(
            stringLiteral(`<${path.node.openingElement.name.name} />`)
          );
        }
      },
    }) && exit(1)
  );
}

module.exports = createMacro(macro);
