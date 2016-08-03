'use strict';

/**
 * Profiles webpack generation and displays time elapsed for
 * debugging slow compilation.
 */

const chalk = require('chalk');
const logPrefix = '[WebpackSlowPlugin]: ';


function WebpackProfilerPlugin(options) {
    options = options || {};
    options.delay = parseInt(options.delay);
    options.delay = !isNaN(options.delay) ? options.delay : 1000;

    this.options = options;
}


WebpackProfilerPlugin.prototype.apply = function (compiler) {

    var delay = this.options.delay;

    compiler.plugin('done', () => {

        var beginTime = Date.now();
        var curTime = beginTime;
        var secondsElapsed = 0;

        console.log('');
        console.log(chalk.yellow(logPrefix + 'Begin'));

        while (curTime - beginTime < delay) {
            curTime = Date.now();
            if (Math.floor((curTime - beginTime) / 1000) > secondsElapsed) {
                secondsElapsed++;
                console.log(chalk.yellow(logPrefix + secondsElapsed + '/' + Math.ceil(delay / 1000)));
            }
        }

        console.log(chalk.yellow(logPrefix + 'End'));
        console.log('');
    });
};


module.exports = WebpackProfilerPlugin;
