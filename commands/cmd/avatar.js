const chalk = require('chalk');
const fs = require('fs');

exports.run = async (client, rl, args) => {
    try {
        let link = args[0] || 'avatar.jpg'
        let path = `./assets/${link}`
        if (!client.user)
            return client.log('Client isn\'t logged in!', chalk.redBright)
        if (fs.existsSync(path))
            client.user.setAvatar(path).then(client.log(`New Avatar Set: (${path}).`, chalk.cyan))
        else client.log(`No avatar with path: (${path}).`, chalk.red)
    } catch (err) {
        console.log('------------------');
        console.log('Cmd prompt: Error');
        console.log('Name: ' + err.name);
        console.log('Stack: ' + err.stack);
        console.log('------------------');
    }
};
exports.help = {
    name: 'avatar'
};