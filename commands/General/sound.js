const { MessageEmbed } = require('discord.js');
const { PREFIX } = require('../../config');
const db = require('../../reconDB');
module.exports = {
config: {
    name: 'soundboard',
    aliases: ["sound", "sb"],
},
run: async(bot, message, args) => {
    let prefix;
    let fetched = await db.get(`prefix_${message.guild.id}`);

    if (fetched === undefined) {
        prefix = PREFIX
    } else {
        prefix = fetched
    }
    message.react("🤔")
   
    const embed = new MessageEmbed()
    .setTitle(`<:sound:867315561210183690> Akinator | Soundboard`, bot.user.displayAvatarURL())
    .setThumbnail(`https://i.pinimg.com/originals/fe/e0/24/fee0246d3c4bddd06e95b41afbf13024.png`)
    .setDescription(`Here\'s the list of sound effects that you can use in a voice channel. In order to use the soundboard, join a voice channel and run the command \`${prefix}<name of the sound>\`\nFor example: \`${prefix}reee\`\n\n
    <:sound:867315561210183690> ahh\n<:sound:867315561210183690> alia\n<:sound:867315561210183690> copystrike\n<:sound:867315561210183690> daddy\n<:sound:867315561210183690> depress\n<:sound:867315561210183690> rickroll\n<:sound:867315561210183690> bruh\n<:sound:867315561210183690> firefly\n<:sound:867315561210183690> jeff\n<:sound:867315561210183690> lambo\n<:sound:867315561210183690> moan\n<:sound:867315561210183690> nani\n<:sound:867315561210183690> ohh\n<:sound:867315561210183690> reee\n<:sound:867315561210183690> seinfeld\n<:sound:867315561210183690> shrimp\n<:sound:867315561210183690> shutdown\n<:sound:867315561210183690> spaghet\n<:sound:867315561210183690> startup\n<:sound:867315561210183690> suckyourmum\n<:sound:867315561210183690> thomas\n<:sound:867315561210183690> yeet\n<:sound:867315561210183690> zedther\n\nTo disconnect the bot, type \`${prefix}leave\` `)
    .setFooter(bot.user.username, bot.user.displayAvatarURL())
    .setColor("GOLD")

    message.lineReplyNoMention(embed)
   
    }
}