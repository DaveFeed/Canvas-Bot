//Cpu and shit
const os = require('os');
const cpuStat = require('cpu-stat');
const config = require(`../../config`);

exports.run = async (client, rl, args) => {
    try {
        let totalSecondsOS = os.uptime();
        cpuStat.usagePercent(function (err, percent, s) {
            if (err) return console.log(err);
            var avgClockMHz = cpuStat.avgClockMHz();
            var totalCores = cpuStat.totalCores();
            var totalSeconds = client.uptime / 1000;
            client.log(`\n> Hardware:`);
            client.log(`|  Platform: ${os.platform()}.`);
            client.log(`|  Uptime: ${Math.floor((totalSecondsOS % 2073600) / 86400)}d, ${Math.floor((totalSecondsOS % 86400) / 3600)}h, ${Math.floor((totalSecondsOS % 3600) / 60)}m, ${Math.floor(totalSecondsOS % 60)}s.`);
            client.log(`|  CPU usage: ${Math.round(percent*100)/100}%.`);
            client.log(`|  CPU avgGHz: ${Math.round(avgClockMHz*100)/100}. `);
            client.log(`|  CPU cores: ${totalCores}.`);
            client.log(`|  RAM usage: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100} / ${Math.round(os.totalmem()/1024/1024*100)/100} MB.`);
            client.log(`\n> Bot:`);
            client.log(`|  Servers: ${client.guilds.cache.size}. `);
            client.log(`|  Users: ${client.users.cache.size}.`);
            client.log(`|  Current Total Commands: ${global.totalCommands}.`);
            client.log(`|  Current Total Messages: ${global.totalMessages}.`);
            client.log(`|  Uptime: ${Math.floor((totalSeconds % 2073600) / 86400)}d, ${Math.floor((totalSeconds % 86400) / 3600)}h, ${Math.floor((totalSeconds % 3600) / 60)}m, ${Math.floor(totalSeconds % 60)}s.`);
            client.log(`|  Channels: ${client.channels.cache.size}.\n`);
        });
    } catch (err) {
        console.log('------------------');
        console.log('Cmd prompt: Error');
        console.log('Name: ' + err.name);
        console.log('Stack: ' + err.stack);
        console.log('------------------');
    }
};
exports.help = {
    name: 'stats'
};