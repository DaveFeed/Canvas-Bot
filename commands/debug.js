const config = require('../config');

exports.run = async (client, message, args) => {
    if (!config.Users.superIDs.includes(message.author.id) && config.Users.owner !== message.author.id)
        return message.react('❌');
    if (args[0] && args[0].toLowerCase() == 'state')
        return message.channel.send(`Debug state: \`${global.debug?`On`:`Off`}\``)
    global.debug = !global.debug;
    if (global.debug) return message.channel.send("`Debug: On`");
    else return message.channel.send("`Debug: Off`");
}

exports.help = {
    name: 'debug',
    description: `Turn Debugging on and off.\
    \nOnly some dudes.\
    \nCheck state \`${config.prefix}debug state\`.\
    \nUsage: \`${config.prefix}debug\``
};