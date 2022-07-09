const Discord = require('discord.js');
const config = require('./config');
const client = new Discord.Client({
  fetchAllMembers: true,
  ws: {
    large_threshold: 249,
    intents: Discord.Intents.ALL //i don't fucking remember has it changed in new versions or not, but i con't even care tbh :)
  }
});
const fs = require('fs');
if (!fs.existsSync('./Electron/db.json')) {
  global.db = [];
  for (let i = 0; i < config.Canvas.width; i++)
    global.db.push(new Array(config.Canvas.height).fill({
      "r": 255,
      "g": 255,
      "b": 255,
      "time": 0
    }))
  fs.writeFileSync("./Electron/db.json", JSON.stringify(global.db))
} else global.db = require('./Electron/db.json')
global.cooldown = {};
global.totalCommands = 0;
global.totalMessages = 0;
global.cooldown = {}
global.debug = config.debug ? true : false;
client.commands = new Discord.Collection();
require('./utils/functions')(client);
require('./cmd').run(client);

client.Load.event(client, true)
client.Load.all(client, true)

client.login(config.token);

//Logging config data
client.log(`\n> Config data:\
  \n|Global prefix: ${config.prefix}\
  \n|Command Prompt prefix: ${config.cmd_prefix}\
  \n|Direct Message prefix: ${config.dm_prefix}\
  \n|Token: ${config.token.substr(0, 4) + "..." + config.token.substr(config.token.length - 4)}\
  \n|OwnerID: ${config.Users.owner}`);
client.log(`> You can use command prompt for bot data managment purposes. Type "${config.cmd_prefix}help" for more info.\n`);
//client.catch(err => console.log)
