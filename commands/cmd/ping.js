const chalk = require('chalk');

exports.run = async (client, rl, args) => {
    try {
        client.log(`\n   Pong!`, chalk.green);
        client.log(` WC: ${client.ws.ping}mc. \n`, chalk.bgGreen, chalk.black);
    } catch (err) {
        console.log('------------------');
        console.log('Cmd prompt: Error');
        console.log('Name: ' + err.name);
        console.log('Stack: ' + err.stack);
        console.log('------------------');
    }
};
exports.help = {
    name: 'ping'
};