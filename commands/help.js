const config = require('../config');
const Discord = require('discord.js')
exports.run = async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
        .setTitle("Help")
        .setColor("yellow")
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription(
            `**What is this bot?**\
            \nCurrently this bot is used as a drawing bot.\
            \n**How does this work?**\
            \nYou can color every pixel you want on the canvas. Canvas size is ${config.Canvas.width}x${config.Canvas.height}. Just run \`${config.prefix}color\` or \`${config.prefix}color help\` for more information.\
            \nFor more info check \`${config.prefix}info\`!`
        ).setFooter("If bot reacts with \"🐛\", then debug mod is on :)")
        .setTimestamp()
    return message.channel.send(embed);
}

exports.help = {
    name: 'help'
};