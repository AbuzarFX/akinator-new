const { MessageEmbed } = require('discord.js')

module.exports = {
    config: {
    name: 'uptime',
    description: 'Returns the uptime of the bot.',
    aliases: ["upt"]
    },
    run: async (client, message, args) => {
	message.react("🤔")
    
        {
            let days = Math.floor(client.uptime / 86400000);
            let hours = Math.floor(client.uptime / 3600000) % 24;
            let minutes = Math.floor(client.uptime / 60000) % 60;
            let seconds = Math.floor(client.uptime / 1000) % 60;
    
            const embed = new MessageEmbed()
            .setAuthor(`Akinator`, client.user.displayAvatarURL())
                .setTitle(`Uptime #${message.guild.shard.id}`)
                .setColor("GOLD")
                .setDescription(`\`${days} days ${hours} hours ${minutes} minutes ${seconds} seconds\``)
                .setThumbnail(`https://i.pinimg.com/originals/fe/e0/24/fee0246d3c4bddd06e95b41afbf13024.png`)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true}))
  
            message.lineReplyNoMention(embed);
            
        }
    }
}