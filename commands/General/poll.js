const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "poll",
        description: "Create a poll with a Yes/No poll.",
        usage: "[question]",

    },
    run: async (bot, message, args) => {
        message.react("🤔")
     
        
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.lineReplyNoMention({ embed: {
        color: 'GOLD',
        description: "You're missing the `Manage Guild` permission!",
        }});

        if (!args[0])
            return message.lineReplyNoMention({ embed: {
            color: 'GOLD',
            description: "Please enter the context of the poll!",
            }});

        const embed = new MessageEmbed()
            .setColor("GOLD")
            .setTitle(`Poll 📢\n\n`)
            .setFooter(`Poll created by ${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`${args.join(' ')}\n\n`)
        var msg = await message.channel.send(embed);

        await msg.react('👍🏻');
        await msg.react('👎🏻');
       

        message.delete({ timeout: 1000 });
    }
}