const chalk = require("chalk");

exports.run = async (client, rl, args) => {
    try {
        client.generateInvite(args[0]).then(link => {
            client.log(`\nInvite Link: ${link.toString()}\n`, chalk.gray);
        });
    } catch (err) {
        console.log('------------------');
        console.log('Cmd prompt: Error');
        console.log('Name: ' + err.name);
        console.log('Stack: ' + err.stack);
        console.log('------------------');
    }

};
exports.help = {
    name: 'invite'
};