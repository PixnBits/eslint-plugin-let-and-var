module.exports = {
  create: (context) => {
    // https://github.com/eslint/eslint/blob/master/lib/rules/block-scoped-var.js
    const stack = [];

    function enterScope(statementType) {
      return () => stack.push(statementType);
    }

    function exitScope() {
      stack.pop();
    }

    return {
      // https://github.com/eslint/eslint/blob/master/lib/rules/block-scoped-var.js
      // Manages scopes. (because `context.getScope().type` gives incorrect results)
      BlockStatement: enterScope('BlockStatement'),
      'BlockStatement:exit': exitScope,
      ForStatement: enterScope('ForStatement'),
      'ForStatement:exit': exitScope,
      ForInStatement: enterScope('ForInStatement'),
      'ForInStatement:exit': exitScope,
      ForOfStatement: enterScope('ForOfStatement'),
      'ForOfStatement:exit': exitScope,
      SwitchStatement: enterScope('SwitchStatement'),
      'SwitchStatement:exit': exitScope,
      CatchClause: enterScope('CatchClause'),
      'CatchClause:exit': exitScope,

      'VariableDeclaration:exit': (node) => {
        const reportedScopeType = context.getScope().type;
        const statementType = stack[stack.length - 1];

        var scopeType = reportedScopeType;
        // block scopes not reported in global scope, inspect the statement
        switch (
          reportedScopeType !== 'global' ? reportedScopeType : statementType
        ) {
          case 'for':
          case 'ForStatement':
            scopeType = 'block';
            break;
          case 'function':
            if (statementType !== 'BlockStatement') {
              scopeType = 'block';
            }
            break;
          default:
            // keep the reported type
            break;
        }

        if (node.kind === 'var') {
          if (scopeType !== 'function' && scopeType !== 'module') {
            context.report({
              node,
              message: `"var" used outside of function scope (saw in ${scopeType})`,
              // fix: fixVar(context, node, scopeType),
            });
          }
        } else if (node.kind === 'let') {
          if (scopeType !== 'block') {
            context.report({
              node,
              message: `"let" used outside of block scope (saw in ${scopeType})`,
              // fix: fixLet(context, node, scopeType),
            });
          }
        } else {
          // ignore const
        }
      },
    };
  },
};
