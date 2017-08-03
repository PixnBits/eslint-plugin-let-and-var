const rule = require('../../../lib/rules/scopes');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2015 },
});
ruleTester.run('scopes', rule, {
  valid: [
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
    // Parsing error: 'import' and 'export' may appear only with 'sourceType: module'
    // need a way to test 'module' scope
    // `
    // import fs from 'fs';
    //
    // var m = 0;
    // `,

    // https://davidwalsh.name/for-and-against-let
    `
    if (a) {
      let b = a + 2;
    }
    `,
    `
    if (a) {    // block is obviously scoped
      let b;
    }
    `,
    // valid for this rule but cited as a refactoring hazard
    `
    if (a) {
      // more code

      let b = 10;

      // more code

      let c = 1000;

      // more code

      if (b > 3) {
          // more code

          console.log( b + c );

          // more code
      }

      // more code
    }
    `,
    `
    if (a) {
      // more code

      // make an explicit scope block!
      { let b, c;
          // more code

          b = 10;

          // more code

          c = 1000;

          // more code

          if (b > 3) {
              // more code

              console.log( b + c );

              // more code
          }
      }

      // more code
    }
    `,
    `
    for (let i=1; i<=5; i++) {
        setTimeout(function(){
            console.log("i:",i);
        },i*1000);
    }
    `,
    // eslint ES2015 parser doesn't handle this syntax
    // `
    // if (a) {
    //     // make an explicit scope block!
    //     let (b, c) {
    //         // ..
    //     }
    // }
    // `,
    `
    function foo() {
      var a = 10;

      if (a > 2) {
          let b = a * 3;
          console.log(b);
      }

      if (a > 5) {
          let c = a / 2;
          console.log(c);
      }

      console.log(a);
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
      errors: [{ message: '"let" used outside of block scope (saw in function)' }],
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
      errors: [{ message: '"var" used outside of function scope (saw in block)' }],
    },

    // https://davidwalsh.name/for-and-against-let
    {
      code: `
      function foo() {
        var bar = 2;
        if (bar > 1 || bam) {
            var baz = bar * 10;
        }

        var bam = (baz * 2) + 2;

        console.log( bam );
      }
      `,
      errors: [{ message: '"var" used outside of function scope (saw in block)' }],
    },
    {
      code: `
        for (var i=0; i<10; i++) {
          // ..
        }
      `,
      errors: [{ message: '"var" used outside of function scope (saw in block)' }],
    },
    {
      code: `
        function foo() {
          var a, b;

          // other code

          // later, swap \`a\` and \`b\`
          if (a && b) {
            var tmp = a;
            a = b;
            b = tmp;
          }
        }
      `,
      errors: [{ message: '"var" used outside of function scope (saw in block)' }],
    },
    {
      code: `
        function foo() {
          a = 1;                  // careful, \`a\` has been hoisted!

          if (a) {
              var a;              // hoisted to function scope!
              let b = a + 2;      // \`b\` block-scoped to \`if\` block!

              console.log( b );   // 3
          }

          console.log( a );       // 1
          console.log( b );       // ReferenceError: \`b\` is not defined
        }
      `,
      errors: [{ message: '"var" used outside of function scope (saw in block)' }],
    },
    {
      code: `
        for (var i=0; i<10; i++) {
            if (i == 2) {
                setTimeout(function(){
                    if (i == 10) {
                        console.log("Loop finished");
                    }
                },100);
            }
        }
      `,
      errors: [{ message: '"var" used outside of function scope (saw in block)' }],
    },
  ],
});
