const settings = module.require("../config.json");
const Discord = require('discord.js');

module.exports.run = async (client, msg, args) => {
    
    msg.channel.send(`Pong`);

    
}

module.exports.help = {
    name: "ping",
    reqPerms: [],
    description: "Test Command",
    usage: `${settings.prefix}Test Command`,
    aliases: []
}