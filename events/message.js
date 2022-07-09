const config = require('../config');
const chalk = require('chalk');
const Discord = require('discord.js');

module.exports = async (client, message) => {
    //if (message.author.bot) return;
    global.totalMessages++;
    if (message.content.trim() == `<@!${client.user.id}>`)
        return message.channel.send(`**Prefix:** \`${config.prefix}\``)

    if (message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);
    if (!cmd) return;

    if (global.debug && !config.Users.superIDs.includes(message.author.id) && config.Users.owner !== message.author.id)
        return message.react('🐛');

    if (cmd.help.cooldown) {
        if (!global.cooldown)
            global.cooldown = {};
        if (!global.cooldown[message.author.id])
            global.cooldown[message.author.id] = {};
        if (!global.cooldown[message.author.id][cmd.help.name])
            global.cooldown[message.author.id][cmd.help.name] = {
                time: new Date().getTime(),
                msg_count: 0,
                state: false
            }
        else {
            if (cmd.help.awaitfinish && !global.cooldown[message.author.id][cmd.help.name].state) {
                if (global.cooldown[message.author.id][cmd.help.name].msg_count >= 10)
                    return message.react('❌')
                global.cooldown[message.author.id][cmd.help.name].msg_count++;
                return message.channel.send("> You need to wait until the command is done! Don't type the same command over and over again!")
            }
            if (new Date().getTime() - global.cooldown[message.author.id][cmd.help.name].time < cmd.help.cooldown * 1000) {
                if (global.cooldown[message.author.id][cmd.help.name].msg_count >= 10)
                    return message.react('❌')
                global.cooldown[message.author.id][cmd.help.name].msg_count++;
                return message.channel.send("> You are under cooldown. Wait another: " + Math.ceil((new Date().getTime() - global.cooldown[message.author.id][cmd.help.name].time) / 1000) + " seconds.")
            }
        }
    }

    console.log(`[Date: ${client.FormatDate(message.createdTimestamp)}] [Guild] [AuthorId: ${message.author.id}] [${command}] {${args.join(' ')}}`);
    global.totalCommands++;
    if (args[0] && args[0].toLowerCase() == 'help' && cmd.help.description)
        return message.channel.send(
            new Discord.MessageEmbed()
            .setTitle(`Help for "${command[0].toUpperCase()}${command.slice(1)}"`)
            .setDescription(cmd.help.description)
        )
    try {
        if (cmd.help.cooldown) {
            global.cooldown[message.author.id][cmd.help.name] = {
                time: new Date().getTime(),
                msg_count: 0,
                state: false
            }
        }
        await cmd.run(client, message, args);
    } catch (err) {
        console.log(err)
    } finally {
        if (cmd.help.cooldown) {
            global.cooldown[message.author.id][cmd.help.name].state = true;
            global.cooldown[message.author.id][cmd.help.name].msg_count = 0;
        }
    }
};