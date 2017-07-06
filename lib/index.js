const path = require('path');

// this comes from the eslint-plugin generator, but tempted to remove it
const requireIndex = require('requireindex');

module.exports.rules = requireIndex(path.join(__dirname, 'rules'));
