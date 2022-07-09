require('dotenv-flow').config();

module.exports = {
    token: process.env.API_KEY,
    danbot: process.env.DANBOT_KEY,
    prefix: 'CDS!',
    cmd_prefix: '',
    debug: false,
    generateInvites: true,
    Users: {
        owner: `470991764308754433`,
        superIDs: [],
    },
    Canvas:{
        width:52,
        height:38,
        cooldown: 10
    }
};