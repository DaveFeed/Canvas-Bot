const config = require('../config');
const Discord = require('discord.js')
exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send("No arguments!")
    let x = parseInt(args[0])
    let y = parseInt(args[1])
    if (isNaN(x) || isNaN(y))
        return message.channel.send(`:x: | Wrong arguments, example: \`${config.prefix}color {X} {Y} {...color}\``)
    if (x >= config.Canvas.width || y >= config.Canvas.height || x < 0 || y < 0) 
        return message.channel.send(`:x: | Wrong cooridantes, canvas size ${config.Canvas.width}x${config.Canvas.height}.`)
    return message.channel.send(new Discord.MessageEmbed()
        .setTitle("Pixel Info")
        .setColor(rgbToHex(global.db[x][y].r, global.db[x][y].g, global.db[x][y].b))
        .addField("X", x, true)
        .addField("Y", y, true)
        .addField("Time when changed (GMT +0)", global.db[x][y].time > 0 ? client.FormatDate(global.db[x][y].time) : "Never changed")
        .addField("Who changed", global.db[x][y].id === undefined ? "Never changed" : `<@${global.db[x][y].id}>`)
    )
}

exports.help = {
    name: 'info',
    cooldown: 10,
    awaitfinish: true
};


function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}