const { createHash } = require('crypto');
const update = require('immutability-helper');
const {
  arrayExpression,
  arrowFunctionExpression,
  booleanLiteral,
  callExpression,
  identifier,
  importDeclaration,
  importSpecifier,
  isJSXOpeningElement,
  isVariableDeclarator,
  jSXAttribute,
  jSXExpressionContainer,
  jSXIdentifier,
  logicalExpression,
  memberExpression,
  objectProperty,
  stringLiteral,
  variableDeclarator,
} = require('@babel/types');

class Field {
  static enhance({ declarator, instance, key, path }, index) {
    const id = encrypt(instance, key, index);
    const tokens = {
      onChange: identifier(id.concat('OnChange')),
    };

    return [
      declarator.insertAfter(
        variableDeclarator(
          tokens.onChange,
          callExpression(identifier('useOnChange'), [
            arrowFunctionExpression(
              [identifier('value')],
              callExpression(
                memberExpression(
                  identifier(instance),
                  identifier('setFieldValue')
                ),
                [stringLiteral(key), identifier('value'), booleanLiteral(false)]
              )
            ),
            arrayExpression([
              memberExpression(
                identifier(instance),
                identifier('setFieldValue')
              ),
            ]),
          ])
        )
      ),
      path
        .findParent(isJSXOpeningElement)
        .pushContainer('attributes', [
          jSXAttribute(
            jSXIdentifier('error'),
            jSXExpressionContainer(
              logicalExpression(
                '&&',
                memberExpression(identifier(instance), identifier('debugging')),
                memberExpression(
                  memberExpression(identifier(instance), identifier('errors')),
                  stringLiteral(key),
                  true
                )
              )
            )
          ),
          jSXAttribute(jSXIdentifier('id'), stringLiteral(id)),
          jSXAttribute(jSXIdentifier('name'), stringLiteral(key)),
          jSXAttribute(
            jSXIdentifier('onChange'),
            jSXExpressionContainer(tokens.onChange)
          ),
          jSXAttribute(
            jSXIdentifier('ref'),
            jSXExpressionContainer(
              memberExpression(
                memberExpression(
                  memberExpression(identifier(instance), identifier('refs')),
                  identifier('current')
                ),
                stringLiteral(key),
                true
              )
            )
          ),
          jSXAttribute(
            jSXIdentifier('value'),
            jSXExpressionContainer(
              memberExpression(
                memberExpression(identifier(instance), identifier('values')),
                stringLiteral(key),
                true
              )
            )
          ),
        ]),
    ];
  }
}

class Form {
  static enhance({ instance, key, path }, index) {
    const id = encrypt(instance, index);

    return path
      .findParent(isJSXOpeningElement)
      .pushContainer('attributes', [
        jSXAttribute(jSXIdentifier('id'), stringLiteral(id)),
        jSXAttribute(jSXIdentifier('name'), stringLiteral(key)),
        jSXAttribute(
          jSXIdentifier('onSubmit'),
          jSXExpressionContainer(
            memberExpression(identifier(instance), identifier('submit'))
          )
        ),
      ]);
  }
}

class Keys {
  static get({ key: { name, value } }) {
    return value || name || '';
  }
}

class Program {
  static enhance = {
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
  };
}

class References {
  constructor({ filename }) {
    this.filename = filename;
  }

  enhance = (reference, index) => {
    const { parentPath } = reference;
    const instance = encrypt(this.filename, index);
    const declarator = reference.findParent(isVariableDeclarator);
    const root = declarator.get('id');
    const [settings] = parentPath.get('arguments');
    const access = (properties, node) => {
      const {
        value: { name: value },
      } = node;
      const key = Keys.get(node);
      const format = (path) => ({ declarator, instance, key, path });

      return properties.concat(
        parentPath.scope.getBinding(value).referencePaths.map(format)
      );
    };
    const categorize = (stack, { node }) => {
      const key = Keys.get(node);
      const get = () => {
        switch (key.trim().toLowerCase()) {
          case 'fields':
            return node.value.properties;
          case 'form':
            return [node];
          default:
            return [];
        }
      };
      const assign = (current = []) => current.concat(get().reduce(access, []));

      return update(stack, { [key]: { $apply: assign } });
    };
    const { fields, form } = root.get('properties').reduce(categorize, {});

    return [
      settings.unshiftContainer(
        'properties',
        objectProperty(identifier('hash'), stringLiteral(instance))
      ),
      root.pushContainer(
        'properties',
        objectProperty(identifier(instance), identifier(instance))
      ),
      form.forEach(Form.enhance),
      fields.forEach(Field.enhance),
    ];
  };
}

function encrypt(...fragments) {
  return '_'.concat(
    createHash('md5')
      .update(''.concat(...fragments))
      .digest('hex')
  );
}

module.exports = { Field, Form, Keys, Program, References, encrypt };
