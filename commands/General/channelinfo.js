const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "channelinfo",
        aliases: ['ci', 'channeli', 'cinfo'],
        category: "info",
        description: "Shows Channel Info",
        usage: "[ channel mention | channel name | ID] (optional)",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {
        message.react("🤔")
       
        let channel = message.mentions.channels.first() || bot.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.channel;
        if (!channel) return message.lineReplyNoMention({ embed: {
        color: 'GOLD',
        description: 'Couldn\'t find the mentioned channel!',
        }});

        let channelembed = new MessageEmbed()
        .setDescription(`Channel Information - ${channel.name}\n\u200b`)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .addField(":underage: NSFW", `\`\`\`${channel.type === 'text' ? channel.nsfw : `No`}\`\`\``, true)
            .addField(":id: Channel ID", `\`\`\`${channel.id}\`\`\``, true)
            .addField("💬 Channel Type", `\`\`\`${channel.type}\`\`\``, true)
            .addField("✉️ Channel Description", `\`\`\`${channel.topic || "No Description"}\`\`\``, true)
            .addField(":timer: Channel Created At", `\`\`\`${channel.createdAt}\`\`\``, true)
            .setColor("GOLD")
            .setFooter(`Akinator • bit.ly/aki-discord`)
        message.lineReplyNoMention(channelembed);
    
    }
}