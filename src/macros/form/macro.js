const { createMacro } = require('babel-plugin-macros');
const { Persistence } = require('./libs');

function macro({
  babel: {
    types: {
      identifier,
      importDeclaration,
      importSpecifier,
      isVariableDeclarator,
      jSXAttribute,
      jSXClosingElement,
      jSXElement,
      jSXExpressionContainer,
      jSXIdentifier,
      jSXOpeningElement,
      memberExpression,
      objectProperty,
      stringLiteral,
    },
  },
  state: {
    file: { path: program },
    filename,
  },
  references: { default: references },
}) {
  const extract = (stack, { parentPath: { parentPath } }, index) => {
    const { check, get, identify } = new Persistence({
      state: stack,
      filename,
      index,
    });

    parentPath.traverse({
      CallExpression(path) {
        path.traverse({
          ObjectExpression(path) {
            path.pushContainer(
              'properties',
              objectProperty(identifier('hash'), stringLiteral(identify()))
            );
          },
        });
      },
      Identifier(path) {
        return check(path);
      },
      ObjectPattern(path) {
        if (isVariableDeclarator(path.parentPath)) {
          path.unshiftContainer(
            'properties',
            objectProperty(identifier(identify()), identifier(identify()))
          );
        }
      },
    });

    return get();
  };
  const components = references.reduce(extract, {});

  program.traverse({
    ImportDeclaration({
      node: {
        source: { value },
      },
      parentPath,
    }) {
      if (value.endsWith('/macros/form/macro')) {
        parentPath.pushContainer(
          'body',
          importDeclaration(
            [importSpecifier(identifier('useForm'), identifier('useForm'))],
            stringLiteral('hooks')
          )
        );
      }
    },
    JSXElement(path) {
      const {
        node: {
          openingElement: {
            name: { name },
            attributes,
          },
        },
      } = path;
      const { [name]: component } = components;

      if (component) {
        path.replaceWith(
          jSXElement(
            jSXOpeningElement(
              jSXIdentifier(name),
              attributes.concat(
                jSXAttribute(
                  jSXIdentifier('value'),
                  jSXExpressionContainer(
                    memberExpression(
                      memberExpression(
                        identifier(component.hash),
                        identifier('values')
                      ),
                      identifier(component.key)
                    )
                  )
                )
              )
            ),
            jSXClosingElement(jSXIdentifier(name)),
            []
          )
        );
        path.skip();
      }
    },
  });
}

module.exports = createMacro(macro);
