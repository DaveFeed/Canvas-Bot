const chalk = require('chalk');
const moment = require('moment-timezone');
const fs = require('fs');
const Discord = require('discord.js')

module.exports = client => {
    client.clean = text => {
        if (typeof (text) === "string") {
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        } else {
            return text;
        }
    };

    client.log = function (text) {
        for (let i = 1; i < arguments.length; i++) {
            text = arguments[i](text);
        }
        console.log(text);
    };

    client.FormatDate = date => {
        return moment(date).tz('Africa/El_Aaiun').format('DD.MM.YYYY, HH:mm:ss');
    };

    client.sleep = ms => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    client.calculateTime = sec => {
        let hours = Math.floor(sec / 3600);
        let minutes = Math.floor((sec - (hours * 3600)) / 60);
        let seconds = sec - (hours * 3600) - (minutes * 60);
        let output = "";
        if (hours != 0) {
            output += `${hours}h , `
        }
        if (minutes != 0) {
            output += `${minutes}m, `
        }
        if (seconds != 0) {
            output += `${seconds}s. `
        } else {
            output = output.slice(0, -2) + ".";
        }
        return output;
    }

    client.Load = {
        cmd: async (client, start) => {
            let count = 0;
            await fs.readdir('./commands/cmd/', async (err, files) => {
                try {
                    start ? console.log(chalk.bgGreen(chalk.black('Loading Cmd Commands:')) + ' Starting ...') : null;
                    if (err) throw err;
                    let i = 0;
                    let jsfiles = files.filter(f => f.split(".").pop() === "js");
                    if (start) {
                        if (jsfiles.length <= 0) client.log("No commands", chalk.gray);
                        else client.log(`Spotted ${jsfiles.length} commands.`, chalk.gray);
                    }
                    client.cmd_commands = new Discord.Collection();
                    jsfiles.forEach((f) => {
                        try {
                            delete require.cache[require.resolve(`../commands/cmd/${f}`)]
                            let props = require(`../commands/cmd/${f}`);
                            client.cmd_commands.set(props.help.name, props);
                            start ? client.log(`${++i}.Loading '${f}'`, chalk.whiteBright) : null;
                            count++;
                        } catch (e) {
                            start ? client.log(`${++i}.Couldn't Load '${f}'`, chalk.redBright) : null;
                            console.log(e)
                        }
                    });
                } catch (error) {
                    console.log(error);
                } finally {
                    if (start) console.log(chalk.bgGreen(chalk.black('Loading Cmd Commands:')) + ' Done !\n');
                    else client.log(`Loaded ${count} CMD commands.`, chalk.gray)
                }
            });
        },
        server: async (client, start) => {
            let count = 0;
            await fs.readdir('./commands/', async (err, files) => {
                try {
                    start ? console.log(chalk.bgMagenta(chalk.black('Loading Commands:')) + ' Starting ...') : null;
                    if (err) throw err;
                    let i = 0;
                    let jsfiles = files.filter(f => f.split(".").pop() === "js");
                    if (start) {
                        if (jsfiles.length <= 0) client.log("No commands", chalk.gray);
                        else client.log(`Spotted ${jsfiles.length} commands.`, chalk.gray);
                    }
                    client.commands = new Discord.Collection();
                    jsfiles.forEach((f) => {
                        try {
                            delete require.cache[require.resolve(`../commands/${f}`)]
                            let props = require(`../commands/${f}`);
                            client.commands.set(props.help.name, props);
                            start ? client.log(`${++i}.Loading '${f}'`, chalk.whiteBright) : null;
                            count++;
                        } catch (e) {
                            start ? client.log(`${++i}.Couldn't Load '${f}'`, chalk.redBright) : null;
                            console.log(e)
                        }
                    });
                } catch (error) {
                    console.log(error);
                } finally {
                    if (start) console.log(chalk.bgMagenta(chalk.black('Loading Commands:')) + ' Done !\n');
                    else client.log(`Loaded ${count} Server commands.`, chalk.gray)
                }
            });
        },
        event: async (client, start) => {
            let count = 0;
            await fs.readdir('./events/', async (err, files) => {
                try {
                    start ? console.log(chalk.bgYellow(chalk.black('Loading Events:')) + ' Starting ...') : null;
                    if (err) throw err;
                    let i = 0;
                    let jsfiles = files.filter(f => f.split(".").pop() === "js");
                    if (start) {
                        if (jsfiles.length <= 0) client.log("No events", chalk.gray);
                        else client.log(`Spotted ${jsfiles.length} events.`, chalk.gray);
                    }
                    jsfiles.forEach((f) => {
                        try {
                            delete require.cache[require.resolve(`../events/${f}`)]
                            let evt = require(`../events/${f}`);
                            client.on(f.split(".")[0], evt.bind(null, client));
                            start ? client.log(`${++i}.Loading '${f}'`, chalk.whiteBright) : null;
                            count++;
                        } catch (e) {
                            start ? client.log(`${++i}.Couldn't Load '${f}'`, chalk.redBright) : null;
                            console.log(e)
                        }
                    });
                } catch (error) {
                    console.log(error);
                } finally {
                    if (start) console.log(chalk.bgYellow(chalk.black('Loading Events:')) + ' Done !\n');
                    else client.log(`Loaded ${count} events.`, chalk.gray)
                }
            });
        },
        all: async (client, start) => {
            client.Load.server(client, start)
            client.Load.cmd(client, start)
        }
    }
};