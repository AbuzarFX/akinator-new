const { MessageEmbed } = require('discord.js');

module.exports = {
config: {
    name: 'ping',
    description: "Returns the bot ping.",

},
run: async(bot, message, args) => {
    message.react("🤔")

    const embed = new MessageEmbed()
    .setDescription('`Pinging...`')
    .setColor("GOLD");    
  const msg = await message.lineReplyNoMention(embed);
  const timestamp = (message.editedTimestamp) ? message.editedTimestamp : message.createdTimestamp; // Check if edited
  const latency = `\`\`\`ini\n[ ${Math.floor(msg.createdTimestamp - timestamp)}ms ]\`\`\``;
  const apiLatency = `\`\`\`ini\n[ ${Math.round(message.client.ws.ping)}ms ]\`\`\``;
  embed.setTitle(`Pong! <:pong:867419205737644044>`)
    .setDescription('')
    .addField(`Latency #${message.guild.shard.id}`, latency, true)
    .addField('API Latency', apiLatency, true)
    .setColor(`GOLD`)
    .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp();
    
  msg.edit(embed);

    }
}