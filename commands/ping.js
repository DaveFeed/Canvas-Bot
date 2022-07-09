const Discord = require('discord.js');
const config = require(`../config`);

module.exports.run = async (client, message, args) => {
    const m = await message.channel.send(new Discord.MessageEmbed().setDescription("Collecting Data ..."));
    let totalSeconds = (client.uptime / 1000);
    m.edit(new Discord.MessageEmbed()
        .setAuthor(`Bot is connected!`)
        .setDescription(
            `Ping: ${m.createdTimestamp - message.createdTimestamp}ms.\
           \nPing WS: ${client.ws.ping}ms.\
           \nUptime: ${Math.floor((totalSeconds % 2073600) / 86400)}d, ${Math.floor((totalSeconds % 86400) / 3600)}h, ${Math.floor((totalSeconds % 3600) / 60)}m, ${Math.floor((totalSeconds % 3600) % 60)}s.`))
};

module.exports.help = {
    name: "ping",
    description: `Check connection info.\
    \nAvailabel to Everyone.\
    \nUsage: ${config.prefix}ping`
}