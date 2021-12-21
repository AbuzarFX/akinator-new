const { MessageEmbed } = require('discord.js');

module.exports = {
config: {
    name: 'servericon',
    description: `Returns the server icon`,
    usage: `servericon | sv`,
    aliases: ["sv"]

},
run: async(bot, message, args) => {
    message.react("🤔")
    message.channel.startTyping()
    const embed = new MessageEmbed()
    .setTitle(`${message.guild.name}'s Icon`)
    .setImage(message.guild.iconURL({ dynamic: true, size: 512 }))
    .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor("GOLD");
  message.lineReplyNoMention(embed);
  message.channel.stopTyping()
    }
}