# eslint-plugin-let-and-var

Use block scopes and `let` while retaining function scopes and `var`.

Useful in retaining a function-first methodology in reasoning while keeping the strengths of `let`: while functions can be considered a type of block scope there is power in thinking in functions over blocks (ex: [Array.prototype methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype#Methods)).

See [For and against `let`](https://davidwalsh.name/for-and-against-let) for other arguments and details.

Couple this with [prefer-const](http://eslint.org/docs/rules/prefer-const). This is an alternative to the (extreme) [no-var](http://eslint.org/docs/rules/no-var).

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-let-and-var`:

```
$ npm install eslint-plugin-let-and-var --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-let-and-var` globally.

## Usage

Add `let-and-var` to the plugins section of your [`.eslintrc.*`](http://eslint.org/docs/user-guide/configuring#configuration-file-formats) configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "let-and-var"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "prefer-const": 2,
        "no-var": 0,
        "let-and-var/scopes": 2
    }
}
```

## Supported Rules

* scopes

    Use `let` in block scopes and `var` in function scopes.
