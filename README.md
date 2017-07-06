# eslint-plugin-let-and-var

Use block scopes and let while retaining function scopes and var

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

Add `let-and-var` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

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
        "let-and-var/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





