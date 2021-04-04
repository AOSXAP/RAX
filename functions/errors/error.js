const chalk = require('chalk');

function error(err){
    console.log(chalk.red(err ));
}

module.exports = error;