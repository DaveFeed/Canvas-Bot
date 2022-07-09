//#region Variables
const Discord = require(`discord.js`);
const readline = require('readline'); 
const config = require(`./config`);
const chalk = require('chalk');
const fs = require('fs');
//#endregion

module.exports.run = async (client) => {
    try {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        rl.on('line', async (input) => {
            if (input.indexOf(config.cmd_prefix) !== 0) return;

            const args = input.slice(config.cmd_prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();

            const cmd = client.cmd_commands.get(command);
            if (!cmd) return client.log('\nCommand Not Detected!\n', chalk.red);

            cmd.run(client, rl, args);
            global.totalCommands++;
        });

        rl.on("SIGINT", function close() {
            let totalSeconds = (client.uptime / 1000);
            client.log(`[Date: ${client.FormatDate(Date.now())}] [Worked for: ${Math.floor(totalSeconds / 86400)}d, ${Math.floor(totalSeconds / 3600)}h, ${Math.floor((totalSeconds % 3600) / 60)}m, ${Math.floor((totalSeconds % 3600) % 60)}s.]`, chalk.gray);
            process.exit();
        });
    } catch (err) {
        console.log('------------------');
        console.log('Cmd prompt: Error');
        console.log('Name: ' + err.name);
        console.log('Stack: ' + err.stack);
        console.log('------------------');
    }
};