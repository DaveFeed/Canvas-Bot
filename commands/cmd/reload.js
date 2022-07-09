const events = require('events');
const config = require(`../../config`);
var reloadEvents = new events.EventEmitter();
reloadEvents.on('err', ErrHandler);
reloadEvents.on('cmd', CmdHandler);
reloadEvents.on('server', ServerHandler);
reloadEvents.on('help', HelpHandler);
reloadEvents.on('all', AllHandler);

module.exports.run = async (client, rl, args) => {
    try {
        if (!args[0])
            return reloadEvents.emit("cmd", client, rl, args);
        switch (args[0].toLowerCase()) {
            case "help":
            case "cmd":
            case "server":
            case "all":
                reloadEvents.emit(args[0].toLowerCase(), client, rl, args.splice(1));
                break;
            default:
                reloadEvents.emit("err", client, rl, args);
                break;
        }
    } catch (err) {
        console.log('------------------');
        console.log('Cmd prompt: Error');
        console.log('Name: ' + err.name);
        console.log('Stack: ' + err.stack);
        console.log('------------------');
    }
};
module.exports.help = {
    name: "reload",
}

async function HelpHandler(client, messsage, args) {
    client.log(`Here is the list of arguments for this command.`);
    client.log(`>   cmd(default) - reloads cmd commands.`);
    client.log(`>   server - reloads dm commands.`);
    client.log(`>   all - reloads all possible commands.`);
}
async function ErrHandler(client, message, args) {
    client.log(`Not valid argument, check "${config.cmd_prefix}reload help".`);
}
async function CmdHandler(client, message, args) {
    await client.Load.cmd(client, true);
}
async function ServerHandler(client, message, args) {
    await client.Load.server(client, true);
}
async function AllHandler(client, message, args) {
    await client.Load.all(client, true);
}