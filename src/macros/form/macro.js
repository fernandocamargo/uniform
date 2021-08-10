// const { exit } = require('process');
const first = require('lodash/first');
const isEqual = require('lodash/isEqual');
const startCase = require('lodash/startCase');
const { createMacro } = require('babel-plugin-macros');
const { encrypt, identify, trace } = require('./helpers');

const ALLOWED = ['fields', 'form'];

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
      logicalExpression,
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
        const tokens = {
          onChange: identifier([hash, 'OnChange', startCase(key)].join('')),
        };
        const isReplaceable = (binding) => {
          const { key: type } = first(trace(path));

          return (
            binding &&
            binding.referenced &&
            ALLOWED.includes(type) && { binding, type }
          );
        };
        const replaceable =
          isEqual(path.key, 'value') &&
          path.findParent(isObjectPattern) &&
          isReplaceable(parentPath.scope.getBinding(name));
        const inject = () => {
          switch (replaceable.type) {
            case 'form':
              return [
                jSXAttribute(jSXIdentifier('id'), stringLiteral(hash)),
                jSXAttribute(
                  jSXIdentifier('onSubmit'),
                  jSXExpressionContainer(
                    memberExpression(identifier(hash), identifier('submit'))
                  )
                ),
              ];
            case 'fields':
              return [
                jSXAttribute(
                  jSXIdentifier('id'),
                  stringLiteral([hash, key].join('.'))
                ),
                jSXAttribute(
                  jSXIdentifier('error'),
                  jSXExpressionContainer(
                    logicalExpression(
                      '&&',
                      memberExpression(
                        identifier(hash),
                        identifier('debugging')
                      ),
                      memberExpression(
                        memberExpression(
                          identifier(hash),
                          identifier('errors')
                        ),
                        identifier(key)
                      )
                    )
                  )
                ),
                jSXAttribute(
                  jSXIdentifier('onChange'),
                  jSXExpressionContainer(tokens.onChange)
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
              ];
            default:
              return [];
          }
        };
        const replace = (path) => {
          parentPath.parentPath.insertAfter(
            variableDeclaration('const', [
              variableDeclarator(
                tokens.onChange,
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
            .pushContainer('attributes', inject());

          return path.findParent(isJSXAttribute).remove();
        };

        return void (
          replaceable && replaceable.binding.referencePaths.forEach(replace)
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

  // exit(1);

  return program;
}

module.exports = createMacro(macro);
