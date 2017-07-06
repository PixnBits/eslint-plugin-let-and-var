'use strict';

const rule = require('../../../lib/rules/let-and-var');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2015 },
});
ruleTester.run('let-and-var', rule, {
  valid: [
    // 'var validVariable = true',
    `
    function declareVariables () {
      var f = 1;
      for (let s = 0; s < 9; s += 1) {
        f += f;
      }
      return f;
    }
    `,
    `
    function declareVariables () {
      var f = 1;
    }
    `,
    `
    for (let s = 0; s < 9;) {
      s += 1;
    }
    `,
  ],

  invalid: [
    {
      code: `
        function declareVariables () {
          let f = 1;
        }
      `,
      errors: [
        { message: `'let' used outside of block scope` },
      ]
    },
    {
      code: `
        function declareVariables () {
          var f = 1;
          for (var s = 0; s < 9; s += 1) {
            f += f;
          }
          return f;
        }
      `,
      errors: [
        { message: `'var' used outside of function scope` },
      ]
    },
    // {
    //     code: 'var invalidVariable = true',
    //     errors: [ { message: 'Unexpected invalid variable.' } ]
    // },
    // {
    //     code: 'var invalidVariable = true',
    //     errors: [ { message: /^Unexpected.+variable/ } ]
    // }
  ]
});
