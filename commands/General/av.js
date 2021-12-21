const { MessageEmbed } = require("discord.js");


module.exports = {
    config: {
    name: "avatar",
    aliases: ['pic', 'pfp', 'av'],
    description: `Enlarges the mentioned user's avatar.`
    },
    run: async(bot, message, args) => {
        message.react("🤔")

        const target = message.mentions.users.first()
        const color = "GOLD";

        if((message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) || 
        (message.guild.me.hasPermission("SEND_EMBEDS"))) {
            
            if(args[0]) {

                    if((args[0].startsWith("<@!")) && 
                            (args[0].endsWith(">")) && 
                            (args[0].length == 22) && 
                            (!isNaN(args[0].slice(3, 21)))) {

                                const userID2 = args[0].slice(3, 21);

                                bot.users.fetch(userID2).then(async(user) => {
                                    message.lineReplyNoMention(new MessageEmbed()
                                    .setAuthor(`${user.tag}`, user.displayAvatarURL({ dynamic: true }))
                                    .setTitle(`Avatar`)
                                    .setImage(user.displayAvatarURL({dynamic: true, size: 4096}))
                                    .setColor(color));
            
                                }).catch(() => {
                                    return message.lineReplyNoMention(new MessageEmbed()
                                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                                    .setTitle("Avatar")
                                    .setImage(message.author.displayAvatarURL({dynamic: true, size: 4096}))
                                    .setColor(color))
                                });

                            } else if((args[0].startsWith("<@")) && 
                            (args[0].endsWith(">")) && 
                            (args[0].length == 21) && 
                            (!isNaN(args[0].slice(2, 20)))) {

                                const userID1 = args[0].slice(2, 20);

                                bot.users.fetch(userID1).then(async(user) => {
                                    message.lineReplyNoMention(new MessageEmbed()
                                    .setAuthor(`${user.tag}`, user.displayAvatarURL({ dynamic: true }))
                                    .setTitle("Avatar")
                                    .setImage(user.displayAvatarURL({dynamic: true, size: 4096}))
                                    .setColor(color));
            
                                }).catch(() => {
                                    return message.lineReplyNoMention(new MessageEmbed()
                                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                                    .setTitle("Avatar")
                                    .setImage(message.author.displayAvatarURL({dynamic: true, size: 4096}))
                                    .setColor(color))
                                });

                            } else if((args[0].startsWith("<@!")) && 
                            (args[0].endsWith(">")) && 
                            (args[0].length == 22) && 
                            (!isNaN(args[0].slice(3, 21)))) {

                                const userID2 = args[0].slice(3, 21);

                                bot.users.fetch(userID2).then(async(user) => {
                                    message.lineReplyNoMention(new MessageEmbed()
                                    .setAuthor(`${user.tag}`, user.displayAvatarURL({ dynamic: true }))
                                    .setTitle("Avatar")
                                    .setImage(user.displayAvatarURL({dynamic: true, size: 4096}))
                                    .setColor(color));
            
                                }).catch(() => {
                                    return message.lineReplyNoMention(new MessageEmbed()
                                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                                    .setTitle("Avatar")
                                    .setImage(message.author.displayAvatarURL({dynamic: true, size: 4096}))
                                    .setColor(color))
                                });


                            } else if((!isNaN(args[0])) && 
                                (args[0].length == 18)) {
                    
                                let userID = args[0];
                    
                                    bot.users.fetch(userID).then(async(user) => {
                                        message.lineReplyNoMention(new MessageEmbed()
                                        .setAuthor(`${user.tag}`, user.displayAvatarURL({ dynamic: true }))
                                        .setTitle("Avatar")
                                        .setImage(user.displayAvatarURL({dynamic: true, size: 4096}))
                                        .setColor(color));

                                    }).catch(() => {
                                        return message.lineReplyNoMention(new MessageEmbed()
                                        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                                        .setTitle("Avatar")
                                        .setImage(message.author.displayAvatarURL({dynamic: true, size: 4096}))
                                        .setColor(color));
                                    })

                                } else {
                                    return message.lineReplyNoMention(new MessageEmbed()
                                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                                    .setTitle("Avatar")
                                    .setImage(message.author.displayAvatarURL({dynamic: true, size: 4096}))
                                    .setColor(color));
                                }

                                
                    } else {
                        return message.lineReplyNoMention(new MessageEmbed()
                                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                                .setTitle("Avatar")
                                .setImage(message.author.displayAvatarURL({dynamic: true, size: 4096}))
                                .setColor(color));
                    }

        } else {
            console.log(`\n\nUnable to run:\nCommand: AVATAR\nGuild Name: ${message.guild.name}\nGuild ID: ${message.guild.id}\nChannel Name: ${message.channel.name}\nChannel ID: ${message.channel.id}\nReason: MISSING_PERMISSIONS`)
        };

    },
};