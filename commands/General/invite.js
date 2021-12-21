const {     MessageEmbed } = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = {
    config: {
    name: 'invite',
    aliases: ['inv'],
    description: "Returns the Invite, Support Server and Top.gg Link of Akinator"
    },
    run: async (bot, message, args) => {
        message.react("🤔")
        try {
            const invite = new MessageButton()
            .setStyle('url')
            .setEmoji("✉️")
            .setLabel(`Invite me`)
            .setURL('https://discord.com/api/oauth2/authorize?client_id=804789290139385887&permissions=2050780656&scope=bot%20applications.commands')

        const Support = new MessageButton()
            .setStyle('url')
            .setEmoji("🙋")
            .setLabel(`Support Server`)
            .setURL('https://discord.gg/YpVQNV8ckH')

        const vote = new MessageButton()
            .setStyle('url')
            .setEmoji("⬆️")
            .setLabel(`Vote on Top.gg`)
            .setURL('https://top.gg/bot/804789290139385887/vote')

        const allbtn = new MessageActionRow()
            .addComponent(invite).addComponent(Support).addComponent(vote)

        let allbuttons = [allbtn];

        let embed = new MessageEmbed()
        .setColor("GOLD")
        .setAuthor(`Akinator`, bot.user.displayAvatarURL())
        .setTitle(`Invite & Support Server Link`)
        .setThumbnail(bot.user.displayAvatarURL())
        .addField(`Invite Link`, `[Click here to invite me.](https://discord.com/api/oauth2/authorize?client_id=804789290139385887&permissions=2050780656&scope=bot%20applications.commands)`)
        .addField(`Support Server`, `[Click here to join the Akinator Server.](https://discord.gg/YpVQNV8ckH)`)
        .setFooter(`Requested by ${message.author.username}`, bot.user.displayAvatarURL())
        .setTimestamp()

        message.channel.send({
            content: ``,
            embed: embed,
            components: allbuttons
        });
        } catch(err) {
            console.log(err)
            message.channel.send(err.message)
        }
    }
}