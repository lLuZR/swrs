const chalk = require('chalk');

function log(str) {
  console.log(chalk.blue(str));
}

function error(str) {
  console.error(chalk.red(str));
}

function success(str) {
  console.log(chalk(chalk.green(str)));
}

module.exports = {
  log,
  error,
  success,
}