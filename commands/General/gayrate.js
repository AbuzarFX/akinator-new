const { MessageEmbed } = require('discord.js');

module.exports = {
config: {
    name: 'gayrate',
    aliases: ['howgay', 'gay', 'grate'],
    description: "Guesses how gay the mentioned user is.",
    usage: "[user]"
},
run: async(bot, message, args) => {
 
    message.react("🤔")
    const user = message.author
    const taggedUser = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
    let gayrate = Math.floor(Math.random () * 101)


    if (taggedUser) {
           let argsEmbed = new MessageEmbed()
            .setTitle("Gayrate Machine")
            .setColor("GOLD")
            .setDescription(`${taggedUser} is \`${gayrate}%\` gay! :rainbow_flag: `)
            .setFooter(message.client.user.username, message.client.user.avatarURL())
        message.lineReplyNoMention(argsEmbed).catch(e => {
            console.log(e)
        })
    } else if (user) {
        let gayrateEmbed = new MessageEmbed()
            .setTitle("Gayrate Machine")
            .setColor("GOLD")
            .setDescription(`${user.username} is \`${gayrate}%\` gay! :rainbow_flag: `)
            .setFooter(message.client.user.username, message.client.user.avatarURL())
        message.lineReplyNoMention(gayrateEmbed).catch(e => {
            console.log(e)
        });
        
         

    }
    }
}