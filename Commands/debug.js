const settings = module.require("../config.json");
const Discord = require('discord.js');

module.exports.run = async (client, msg, args) => {
    
    console.log(`Test`)
    let debugcmd = args[0];
    console.log(debugcmd);

    
}

module.exports.help = {
    name: "debug",
    reqPerms: [],
    description: "Test Command",
    usage: `${settings.prefix}Test Command`,
    aliases: []
}