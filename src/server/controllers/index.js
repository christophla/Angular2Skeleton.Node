/**
 * Recursively iterates over specified directory, require()'ing each file,
 * and returning a nested hash structure containing those modules.
 */

var requireDirectory = require('require-directory');
module.exports = requireDirectory(module);