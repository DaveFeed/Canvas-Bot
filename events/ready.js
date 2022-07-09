const config = require('../config');
const chalk = require('chalk');
const fs = require('fs');

module.exports = async client => {
    client.log(`[Bot Started] [Date: ${client.FormatDate(Date.now())}]`, chalk.gray);
    client.log(`> Logged in as "${client.user.tag}"!`, chalk.green);
    if (config.generateInvites)
        client.generateInvite([]).then(link => {
            console.log("Invite Link: " + link);
        })
    client.user.setPresence({
        activity: {
            name: `Testing btw`
        }
    })

    /*var DanBotHosting = require("danbot-hosting");
    const API = new DanBotHosting.Client(config.danbot, client);

    let initalPost = await API.autopost();

    if (initalPost) {
        console.error(initalPost);
    }*/
};