const chalk = require('chalk');

exports.run = async (client, rl, args) => {
    try {
        let text = args.join(' ');
        if (!client.user)
            return client.log('Client isn\'t logged in!', chalk.redBright)
        client.user.setPresence({
            activity: {
                name: text
            }
        }).then(client.log(`New Presence Text Set: (${text}).`, chalk.magenta))
    } catch (err) {
        console.log('------------------');
        console.log('Cmd prompt: Error');
        console.log('Name: ' + err.name);
        console.log('Stack: ' + err.stack);
        console.log('------------------');
    }
};
exports.help = {
    name: 'presence'
};