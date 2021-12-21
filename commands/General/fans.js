const { MessageEmbed } = require('discord.js');

module.exports = {
config: {
    name: 'fans',
    description: "Returns the invite link of the official Akinator server.",

},
run: async(bot, message, args) => {
    message.react("🤔")
    message.lineReplyNoMention({ embed: {
        color: "GOLD",
        description: `<:Akinator:853909596053831690> Join the [official Akinator server!](https://discord.gg/YpVQNV8ckH)`
    }})
  
    }
}