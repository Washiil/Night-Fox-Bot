const Discord = require('discord.js');
const client = new Discord.Client();
const { token, prefix } = require('./config.json');
const fs = require("fs");

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

function userinput(value, callback) {
    return new Promise(resolve => {
        rl.question(`${value} `, function(answer) {
            console.log(``);
            guildid = answer
            callback();
        });
    });
};

fs.readdir("./Commands/", (err, files) => {
    if(err) console.error(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("No commands to load!");
        return;
    }

    //console.log(`Loading ${jsfiles.length} commands!`);

    jsfiles.forEach((f, i) => {
        let props = require(`./Commands/${f}`);
        //console.log(`${i + 1}: ${f} loaded!`);
        client.commands.set(props.help.name, props);
        props.help.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});

client.on("message", async msg => {
    if(msg.author.bot) return;
    if(msg.author.id == `${client.user.id}`) return;
    if(!msg.content.startsWith(`${prefix}`)) return;

        let args = msg.content.substring(prefix.length).trim().split(" ");
        let cmd = args.shift().toLowerCase();
        let command;
        if(client.commands.has(cmd)) {
            command = client.commands.get(cmd);
        } else {
            command = client.commands.get(client.aliases.get(cmd));
        }
        if(command) command.run(client, msg, args);
        
    }
);

client.once('ready', () => {
    console.clear();
    console.log('\x1b[35m');
    console.log(String.raw`
     __    __ __          __         __          ________
    |  \  |  \  \        |  \       |  \        |        \
    | ▓▓\ | ▓▓\▓▓ ______ | ▓▓____  _| ▓▓_       | ▓▓▓▓▓▓▓▓  ______  __    __
    | ▓▓▓\| ▓▓  \/      \| ▓▓    \|   ▓▓ \      | ▓▓__     /      \|  \  /  \
    | ▓▓▓▓\ ▓▓ ▓▓  ▓▓▓▓▓▓\ ▓▓▓▓▓▓▓\\▓▓▓▓▓▓      | ▓▓  \   |  ▓▓▓▓▓▓\\▓▓\/  ▓▓
    | ▓▓▓▓\ ▓▓ ▓▓  ▓▓▓▓▓▓\ ▓▓▓▓▓▓▓\\▓▓▓▓▓▓      | ▓▓   \  |  ▓▓▓▓▓▓\\▓▓\/  ▓▓
    | ▓▓\▓▓ ▓▓ ▓▓ ▓▓  | ▓▓ ▓▓  | ▓▓ | ▓▓ __     | ▓▓▓▓▓▓  | ▓▓  | ▓▓ >▓▓  ▓▓
    | ▓▓ \▓▓▓▓ ▓▓ ▓▓__| ▓▓ ▓▓  | ▓▓ | ▓▓|  \    | ▓▓      | ▓▓__/ ▓▓/  ▓▓▓▓\
    | ▓▓  \▓▓▓ ▓▓\▓▓    ▓▓ ▓▓  | ▓▓  \▓▓  ▓▓    | ▓▓       \▓▓    ▓▓  ▓▓ \▓▓\
     \▓▓   \▓▓\▓▓_\▓▓▓▓▓▓▓ ▓▓   \▓▓   \▓▓▓▓▓     \▓▓        \▓▓▓▓▓▓ \▓▓   \▓▓
                |  \__| ▓▓
                 \▓▓    ▓▓
                  \▓▓▓▓▓▓
    `)
	console.log(`   ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――`);
	console.log(`   | \x1b[37mDiscord-bot\x1b[35m - \x1b[37m${client.user.tag}\x1b[35m - \x1b[37mOnline!\x1b[35m - Coded By: \x1b[37mWashi\x1b[35m|`);
	console.log(`   ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――`);
    console.log('');
    

});

client.login(token);