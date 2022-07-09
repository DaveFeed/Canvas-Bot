const config = require(`../../config`);

exports.run = async (client, rl, args) => {
    try {
        const code = args.join(" ");
        let evaled = eval(code);
        if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

        client.log(`\nReturned: ${client.clean(evaled)}\n\n`);
    } catch (err) {
        client.log(`\`ERROR\` \`\`\`xl\n${client.clean(err)}\n\`\`\``);
    }
};
exports.help = {
    name: 'eval'
};
