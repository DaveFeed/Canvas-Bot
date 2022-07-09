const Discord = require('discord.js');
const fs = require('fs')
const events = require('events');
const config = require(`../config`);
var reloadEvents = new events.EventEmitter();
reloadEvents.on('err', ErrHandler);
reloadEvents.on('cmd', CmdHandler);
reloadEvents.on('server', ServerHandler);
reloadEvents.on('all', AllHandler);

module.exports.run = async (client, message, args) => {
    if (!config.Users.superIDs.includes(message.author.id) && config.Users.owner !== message.author.id) return;
    if (!args[0])
        return reloadEvents.emit("server", client, message, args);
    switch (args[0].toLowerCase()) {
        case "cmd":
        case "server":
        case "all":
            reloadEvents.emit(args[0].toLowerCase(), client, message, args.splice(1));
            break;
        default:
            reloadEvents.emit("err", client, message, args);
            break;
    }
};
module.exports.help = {
    name: "reload",
}
async function Inform(channel, type) {
    channel.send(new Discord.MessageEmbed()
        .setTitle(`Reloading: "${type}"`)
        .setDescription(`Reload comleted!`))
}
async function ErrHandler(client, message, args) {
    message.channel.send(new Discord.MessageEmbed()
        .setTitle(`Wrong category, try again.`)
        .setColor('#851600'))
}
async function CmdHandler(client, message, args) {
    await client.Load.cmd(client, false);
    Inform(message.channel, 'CMD');
}
async function ServerHandler(client, message, args) {
    await client.Load.server(client, false);
    Inform(message.channel, 'Server');
}
async function AllHandler(client, message, args) {
    await client.Load.all(client, false);
    Inform(message.channel, 'All');
}