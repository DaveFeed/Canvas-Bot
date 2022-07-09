//const beautify = require('js-beautify').js;
const Discord = require('discord.js');
const config = require('../config')

module.exports.run = async (client, message, args) => {
    let code;
    try {
        if (message.author.id !== config.Users.owner) return;
        if (args[0] === undefined) return message.channel.send("> No Arguments bitch!")
        code = args.join(" ");
        let evaled = eval(code);
        if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

        message.channel.send(
            new Discord.MessageEmbed()
            .setTitle("DSafsdasddas!")
            .setColor('#0d7a07')
            .setDescription(`Code: \`\`\`javascript\n${client.clean(code)}\n\`\`\`\nReceived:\`\`\`javascript\n${client.clean(evaled)}\`\`\``));
    } catch (err) {
        message.channel.send(
            new Discord.MessageEmbed()
            .setTitle("Throw Err!")
            .setColor('#8c1804')
            .setDescription(`Code: \`\`\`javascript\n${client.clean(code)}\n\`\`\`\nReceived:\`\`\`javascript\n${client.clean(err.name)}\`\`\``));
    }
};

module.exports.help = {
    name: "eval",
    description: `Eval is eval.\
    \nAvailabeldawdfsd for Owner only.\
    \nUsage: ${config.prefix}eval {code (JS)}`
}