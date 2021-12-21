const {     MessageEmbed } = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = {
    config: {
    name: 'vote',
    aliases: ['vote'],
    description: "Returns the Vote Links of Akinator."
    },
    run: async (bot, message, args) => {

        try {
            const invite = new MessageButton()
            .setStyle('url')
            .setEmoji("🔼")
            .setLabel(`Discord Bot List`)
            .setURL('https://discordbotlist.com/bots/akinator/upvote')

        const Support = new MessageButton()
            .setStyle('url')
            .setEmoji("🚣‍♂️")
            .setLabel(`Discord.boats`)
            .setURL('https://discord.boats/bot/804789290139385887/vote')

        const vote = new MessageButton()
            .setStyle('url')
            .setEmoji("⬆️")
            .setLabel(`Top.gg`)
            .setURL('https://top.gg/bot/804789290139385887/vote')

        const vote2 = new MessageButton()
        .setStyle('url')
        .setEmoji('🔼')
        .setLabel(`Bots For Discord`)
        .setURL('https://botsfordiscord.com/bot/804789290139385887')

        const allbtn = new MessageActionRow()
            .addComponent(invite).addComponent(Support).addComponent(vote).addComponent(vote2)

        let allbuttons = [allbtn];

        let embed = new MessageEmbed()
        
        .setColor("GOLD")
        .setTitle(`<:Akinator:853909596053831690> Akinator Vote Links <:Akinator:853909596053831690>`)
        .setDescription(`[Top.gg](https://top.gg/bot/804789290139385887/vote) • [Discord.boats](https://discord.boats/bot/804789290139385887/vote) • [Discord Bot List](https://discordbotlist.com/bots/akinator/upvote) • [Bots For Discord](https://botsfordiscord.com/bot/804789290139385887) • [Vibe List](https://vibeslist.cf/bot/804789290139385887/vote)`)
        .addField(`\u200b`, `• [Patreon Link](https://www.patreon.com/akinatorbot) •`)
        .setImage(`https://imgur.com/B38aLaY.jpg`)

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