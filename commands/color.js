const config = require('../config');
const colors = require('color-name');
const fs = require('fs');

exports.run = async (client, message, args) => {
    if (args[0]) {
        let x = parseInt(args[0])
        let y = parseInt(args[1])
        let color = [args[2] || 0, args[3] || 0, args[4] || 0]
        if (args[2] !== undefined && isNaN(parseInt(args[2]))) {
            if (colors[args[2].toLowerCase()])
                color = colors[args[2].toLowerCase()]
            else return message.channel.send(':x: | This color doesn\'t exist, please pick another one')
        }
        if (isNaN(x) || isNaN(y))
            return message.channel.send(`:x: | Wrong arguments, example: \`${config.prefix}color {X} {Y} {...color}\``)
        if (x >= config.Canvas.width || y >= config.Canvas.height || x < 0 || y < 0) {
            return message.channel.send(`:x: | Wrong cooridantes, canvas size ${config.Canvas.width}x${config.Canvas.height}.`)
        }
        if (isNaN(parseInt(color[0])) || isNaN(parseInt(color[1])) || isNaN(parseInt(color[2]))) {
            return message.channel.send(`:x: | Something wrong with RGB values. If you used text color conact <@470991764308754433>. If not recheck syntax, example: \`${config.prefix}color {X} {Y} {R} {G} {B}\``)
        }
        let data = {
            r: color[0] > 255 ? 255 : color[0] < 0 ? 0 : color[0],
            g: color[1] > 255 ? 255 : color[1] < 0 ? 0 : color[1],
            b: color[2] > 255 ? 255 : color[2] < 0 ? 0 : color[2],
            id: message.author.id,
            time: new Date().getTime()
        }

        global.db[x][y] = data;
        fs.writeFileSync('./Electron/db.json', JSON.stringify(global.db), (err) => {
            if (err) console.log(err)
        })
        message.react(`👍`)
    } else {
        await message.channel.send(`<@${message.author.id}>, First: Enter coordinates of your pixel\nExample: \`12 10\`, where 12 is X, and 10 is Y.\nCanvas size is ${config.Canvas.width}x${config.Canvas.height}`)
        let x, y, r, g, b;
        await message.channel.awaitMessages(m => {
                if (m.author.id !== message.author.id) return false;
                const args = m.content.trim().split(/ +/g);
                if (isNaN(parseInt(args[0])) || isNaN(parseInt(args[1]))) {
                    m.react('❌')
                    return false;
                }
                if (parseInt(args[0]) < 0 || parseInt(args[0]) >= config.Canvas.width || parseInt(args[1]) < 0 || parseInt(args[1]) >= config.Canvas.height) {
                    m.react('❌')
                    return false;
                }
                x = parseInt(args[0]);
                y = parseInt(args[1]);
                return true;
            }, {
                max: 1,
                time: 30000,
                errors: ['time']
            })
            .catch(o_O => {});
        if (x === undefined || y === undefined)
            return message.channel.send(`Time expired <@${message.author.id}>!`)
        await message.channel.send(`<@${message.author.id}>, Second: Enter color name or RGB values.\nExample \`128 66 12\` for RGB, or \`Aqua\` for color name`)
        await message.channel.awaitMessages(m => {
                if (m.author.id !== message.author.id) return false;
                const args = m.content.trim().split(/ +/g);
                if (isNaN(parseInt(args[0]))) {
                    if (colors[args[0].toLowerCase()]) {
                        r = colors[args[0].toLowerCase()][0]
                        g = colors[args[0].toLowerCase()][1]
                        b = colors[args[0].toLowerCase()][2]
                        return true;
                    } else {
                        m.react('🤷‍♂️')
                        return false;
                    }
                }
                if (isNaN(parseInt(args[0])) || isNaN(parseInt(args[1])) || isNaN(parseInt(args[1]))) {
                    m.react('❌')
                    return false;
                }
                r = parseInt(args[0]) > 255 ? 255 : parseInt(args[0]) < 0 ? 0 : parseInt(args[0]);
                g = parseInt(args[1]) > 255 ? 255 : parseInt(args[1]) < 0 ? 0 : parseInt(args[1]);
                b = parseInt(args[2]) > 255 ? 255 : parseInt(args[2]) < 0 ? 0 : parseInt(args[2]);
                return true;
            }, {
                max: 1,
                time: 30000,
                errors: ['time']
            })
            .catch(o_O => {});
        if (r === undefined || g === undefined || b === undefined)
            return message.channel.send(`Time expired <@${message.author.id}>!`)
        global.db[x][y] = {
            r: r,
            g: g,
            b: b,
            id: message.author.id,
            time: new Date().getTime()
        }
        fs.writeFileSync('./Electron/db.json', JSON.stringify(global.db), (err) => {
            if (err) console.log(err)
        })
        message.channel.send(`<@${message.author.id}> New data was added:\n\`\`\`\nX:${x}\nY:${y}\nRed:${r}\nGreen:${g}\nBlue:${b}\n\`\`\``)
    }
}

exports.help = {
    name: 'color',
    description: `Color a pixel on canvas.\
    \nIf you don 't know the syntax, just run \`${config.prefix}color\`.\
    \nSytnax: \`${config.prefix}color {X} {Y} {RGB or ColorName}\`.\
    \nExample with values: \`${config.prefix}color 10 10 255 0 255\`\
    \nExample with values: \`${config.prefix}color 10 10 red\``,
    cooldown:0,
    awaitfinish:true
};