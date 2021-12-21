const ownerid = "184280327131234306";

module.exports = {
    config: {
        name: "getinvite",
        aliases: ['getinv', 'gi'],
    },
    run: async(bot, message, args) => {
        if (message.author.id === ownerid) {
        let guild = null;

        if (!args[0]) return message.lineReplyNoMention({ embed: {
        color: 'GOLD',
        description: 'Please enter the name of a server!',
        }})

        if(args[0]){
            let fetched = bot.guilds.cache.find(g => g.name === args.join(" "));
            let found = bot.guilds.cache.get(args[0]);
            if(!found) {
                if(fetched) {
                    guild = fetched;
                }
            } else {
                guild = found
            }
        } else {
            return message.lineReplyNoMention({ embed: {
            color: 'GOLD',
            description: 'Invalid server name!',
            }});
        }
        if(guild){
            let tChannel = guild.channels.cache.find(ch => ch.type == "text" && ch.permissionsFor(ch.guild.me).has("CREATE_INSTANT_INVITE"));
            if(!tChannel) {
                return message.lineReplyNoMention({ embed: {
                color: 'GOLD',
                description: 'I don\'t have the required permissions to create an invite!',
                }}); 
            }
            let invite = await tChannel.createInvite({ temporary: false, maxAge: 0 }).catch(err => {
                return message.lineReplyNoMention({ embed: {
                color: 'GOLD',
                description: `${err} has occured!`,
                }});
            });
            message.lineReplyNoMention(invite.url);
        } else {
            return message.lineReplyNoMention({ embed: {
            color: 'GOLD',
            description: `The bot isn\'t in the server - \`${args.join(' ')}\``,
            }});
        }
    } else {
        return;
    }
    }

}
