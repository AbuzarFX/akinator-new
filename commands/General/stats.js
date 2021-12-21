const { MessageEmbed } = require('discord.js')

module.exports = {
    config: {
        name: 'stats',
        aliases: ["stat"],
        description: `Returns the bot statistics`
    },
    run: async (bot, message, args) => {
        message.channel.startTyping()
        message.react("🤔")

        const promisedd = [
            bot.shard.fetchClientValues('guilds.cache.size'),
            bot.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)'),
        ];
        
        Promise.all(promisedd)
            .then(results => {
                const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
                const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
                return message.lineReplyNoMention({ embed: {
                    color: "GOLD",
                    description: `Server count: ${totalGuilds.toLocaleString()} servers\nMember count: ${totalMembers.toLocaleString()} members`
                }})
            })
            .catch(console.error);
            message.channel.stopTyping()



    }
}
