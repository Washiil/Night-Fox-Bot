const settings = module.require("../config.json");
const Discord = require('discord.js');

module.exports.run = async (client, msg, args) => {
    
    let strings = args.join(' ');
    msg.channel.send(strings);
    
}

module.exports.help = {
    name: "write",
    reqPerms: [],
    description: "Test Command",
    usage: `${settings.prefix}Test Command`,
    aliases: []
}