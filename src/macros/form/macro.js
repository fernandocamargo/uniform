const first = require('lodash/first');
const isEqual = require('lodash/isEqual');
const { createMacro } = require('babel-plugin-macros');
const { encrypt, identify, trace } = require('./helpers');

const ALLOWED = ['fields'];

function macro({
  babel: {
    types: {
      arrayExpression,
      arrowFunctionExpression,
      booleanLiteral,
      callExpression,
      importDeclaration,
      importSpecifier,
      identifier,
      isJSXAttribute,
      isJSXOpeningElement,
      isObjectPattern,
      isVariableDeclarator,
      jSXAttribute,
      jSXExpressionContainer,
      jSXIdentifier,
      memberExpression,
      objectProperty,
      stringLiteral,
      variableDeclaration,
      variableDeclarator,
    },
  },
  state: {
    file: { path: program },
    filename,
  },
  references: { default: references },
}) {
  program.traverse({
    ImportDeclaration({
      node: {
        source: { value },
      },
      parentPath,
    }) {
      return void (
        value.endsWith('/macros/form/macro') &&
        parentPath.pushContainer(
          'body',
          importDeclaration(
            [
              importSpecifier(identifier('useForm'), identifier('useForm')),
              importSpecifier(
                identifier('useOnChange'),
                identifier('useCallback')
              ),
            ],
            stringLiteral('hooks')
          )
        )
      );
    },
  });

  references.forEach(({ parentPath: { parentPath } }, index) => {
    const hash = ['_', encrypt(filename), index].join('');

    return parentPath.traverse({
      Identifier(path) {
        const { key, name } = identify(path);
        const isAllowed = () => ALLOWED.includes(first(trace(path)).key);
        const isReplaceable = (binding) => isAllowed() && binding;
        const replaceable =
          isEqual(path.key, 'value') &&
          path.findParent(isObjectPattern) &&
          isReplaceable(parentPath.scope.getBinding(name));
        const replace = (path) => {
          parentPath.parentPath.insertAfter(
            variableDeclaration('const', [
              variableDeclarator(
                identifier(`onChange${key}`),
                callExpression(identifier('useOnChange'), [
                  arrowFunctionExpression(
                    [identifier('value')],
                    callExpression(
                      memberExpression(
                        identifier(hash),
                        identifier('setFieldValue')
                      ),
                      [
                        stringLiteral(key),
                        identifier('value'),
                        booleanLiteral(false),
                      ]
                    )
                  ),
                  arrayExpression([
                    memberExpression(
                      identifier(hash),
                      identifier('setFieldValue')
                    ),
                  ]),
                ])
              ),
            ])
          );

          path
            .findParent(isJSXOpeningElement)
            .pushContainer('attributes', [
              jSXAttribute(
                jSXIdentifier('id'),
                stringLiteral([hash, key].join('.'))
              ),
              jSXAttribute(
                jSXIdentifier('onChange'),
                jSXExpressionContainer(identifier(`onChange${key}`))
              ),
              jSXAttribute(
                jSXIdentifier('value'),
                jSXExpressionContainer(
                  memberExpression(
                    memberExpression(identifier(hash), identifier('values')),
                    identifier(key)
                  )
                )
              ),
            ]);

          return path.findParent(isJSXAttribute).remove();
        };

        return void (
          replaceable && replaceable.referencePaths.forEach(replace)
        );
      },
      ObjectExpression(path) {
        return void path.unshiftContainer(
          'properties',
          objectProperty(identifier('hash'), stringLiteral(hash))
        );
      },
      ObjectPattern(path) {
        return void (
          isVariableDeclarator(path.parentPath) &&
          path.unshiftContainer(
            'properties',
            objectProperty(identifier(hash), identifier(hash))
          )
        );
      },
    });
  });

  return program;
}

module.exports = createMacro(macro);
