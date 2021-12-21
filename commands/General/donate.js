const {MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "donate",
        description: `Returns the patreon link.`
    },
    run: async (bot, message, args) => {
        message.react("🤔")
        const embed = new MessageEmbed()
        .setAuthor(`Akinator`, bot.user.displayAvatarURL())
        .setColor("GOLD")
        .setDescription(`Akinator is a completely free bot to use. Donating to Akinator would help the developers. Click [here](https://www.patreon.com/akinatorbot) to donate.`)
        .setImage(`https://imgur.com/B38aLaY.jpg`)
        message.lineReplyNoMention(embed)
    }
}
