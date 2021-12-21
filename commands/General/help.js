const { MessageEmbed } = require('discord.js');
const simplydjs = require('simply-djs')
const { PREFIX } = require("../../config")
const db = require("../../reconDB")
const { stripIndents } = require("common-tags");

module.exports = {
    config: {
    name: "help",
    aliases: ['h'],
    description: "Shows all available bot commands.",
    },
run: async(bot, message, args) => {

    let prefix;
        let fetched = await db.get(`prefix_${message.guild.id}`);

        if (fetched === undefined) {
            prefix = PREFIX
        } else {
            prefix = fetched
        }
        


    
        

            const main = new MessageEmbed()
            .setAuthor(bot.user.username, bot.user.displayAvatarURL())
            .setColor("GOLD")
            .setTitle(`Akinator | Help Menu`)
            .setDescription(`Akinator will guess who/what you're thinking of! Check out Akinator's [website](https://bit.ly/aki-discord) and the list of [commands](https://bit.ly/akinator-commands). Run \`${prefix}howto\` to know how the game works.\n\nType \`${prefix}start\` to start the game!`)
            .addField(`<:config:867316223737331752> Configuration`, `\u200b`, true)
        .addField(`<:translator:867433126556205076> Languages`, `\u200b`, true)
        .addField(`<:Akinator:853909596053831690> Main`, `\u200b`, true)
        .addField(`<:moderator:867434008292098068> Moderator commands\n`, `\u200b`, true)
        .addField(`<:sound:867315561210183690> Soundboard`, `\u200b`, true)
        .addField(`:file_folder:  Miscellaneous`, `\u200b`, true)
            .setThumbnail(`https://i.pinimg.com/originals/fe/e0/24/fee0246d3c4bddd06e95b41afbf13024.png`)
            .setImage(`https://imgur.com/6cDO7yf.jpg`)
            .setFooter(bot.user.username, bot.user.displayAvatarURL())
            
            const sound = new MessageEmbed()
            .setAuthor(bot.user.username, bot.user.displayAvatarURL())
            .setTitle(`<:sound:867315561210183690> Akinator | Soundboard`, bot.user.displayAvatarURL())
            .setThumbnail(`https://i.pinimg.com/originals/fe/e0/24/fee0246d3c4bddd06e95b41afbf13024.png`)
            .setDescription(`Here\'s the list of sound effects that you can use in a voice channel. In order to use the soundboard, join a voice channel and run the command \`${prefix}<name of the sound>\`\nFor example: \`${prefix}reee\`\n\n
            <:sound:867315561210183690> ahh\n<:sound:867315561210183690> alia\n<:sound:867315561210183690> copystrike\n<:sound:867315561210183690> daddy\n<:sound:867315561210183690> depress\n<:sound:867315561210183690> rickroll\n<:sound:867315561210183690> bruh\n<:sound:867315561210183690> firefly\n<:sound:867315561210183690> jeff\n<:sound:867315561210183690> lambo\n<:sound:867315561210183690> moan\n<:sound:867315561210183690> nani\n<:sound:867315561210183690> ohh\n<:sound:867315561210183690> reee\n<:sound:867315561210183690> seinfeld\n<:sound:867315561210183690> shrimp\n<:sound:867315561210183690> shutdown\n<:sound:867315561210183690> spaghet\n<:sound:867315561210183690> startup\n<:sound:867315561210183690> suckyourmum\n<:sound:867315561210183690> thomas\n<:sound:867315561210183690> yeet\n<:sound:867315561210183690> zedther\n\nTo disconnect the bot, type \`${prefix}leave\` `)
            .setFooter(bot.user.username, bot.user.displayAvatarURL())
            .setColor("GOLD")
            
        const lang = new MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .setColor("GOLD")
        .setThumbnail(`https://i.pinimg.com/originals/fe/e0/24/fee0246d3c4bddd06e95b41afbf13024.png`)
        .setDescription(`**Available Languages** :speech_balloon:\n

        :flag_sa: \`ar\` Arabic - العربية\n
        :flag_cn: \`cn\` Chinese - 中文\n
        :flag_nl: \`nl\` Dutch - Nederlands\n
        :flag_gb: \`en\` English - English\n
        :flag_fr: \`fr\` French - Français\n
        :flag_de: \`de\` German - Deutsch\n
        :flag_it: \`it\` Italian - Italiano\n
        :flag_jp: \`jp\` Japanese - 日本語\n
        :flag_kr: \`kr\` Korean - 한국어\n
        :flag_pl: \`pl\` Polish - Polskie\n
        :flag_pt: \`pt\` Portuguese - Português\n
        :flag_ru: \`ru\` Russian - русский\n
        :flag_es: \`es\` Spanish - Español\n
        :flag_tr: \`tr\` Turkish - Türk\n
        :flag_id: \`id\` Indonesian - Indonesian\n\nType **${prefix}start <language>** to pick one!\nExample: **${prefix}start ru** or **${prefix}start es**\n\nTo make the change for your whole server, type **${prefix}set-lang <language code>**, like so: **${prefix}set-lang es**`)

            const config = new MessageEmbed()
            .setAuthor(bot.user.username, bot.user.displayAvatarURL())
            .setTitle('Akinator | Configuration')
            .setColor(`GOLD`)
            .setDescription(`To change the default prefix of Akinator, use the command \`${prefix}prefix [new prefix]\``)
            .addField(`• Usage`, `\`${prefix}prefix !aki\``)
            .setFooter(bot.user.username, bot.user.displayAvatarURL());

            const mod = new MessageEmbed()
            .setAuthor(bot.user.username, bot.user.displayAvatarURL())
            .setTitle('Akinator | Moderator Commands')
            .setColor('GOLD')
            .setDescription(`Here are the moderator commands that you could use in your server.`)
            .addField(`<a:thonk:867403091149979658> serverinfo`, `Returns the server information.`, true)
            .addField(`<a:thonk:867403091149979658> userinfo`, `Returns the information about the mentioned user.`, true)
            .addField(`<a:thonk:867403091149979658> channelinfo`,`Returns the information about the mentioned channel.`, true)
            .addField(`<a:thonk:867403091149979658> roleinfo`, `Returns the information about the mentioned role.`, true)
            .addField(`<a:thonk:867403091149979658> poll`, `Creates a poll.`, true)
            .addField(`<a:thonk:867403091149979658> uptime`, `Returns the uptime of the bot.`, true)
            .addField(`<a:thonk:867403091149979658> servericon`, `Sends the server icon.`, true)
            .addField(`<a:thonk:867403091149979658> av`, `Enlarges the mentioned user's avatar.`, true)
            .addField(`<a:thonk:867403091149979658> gayrate`, `Checks how gay the mentioned user is. `,true)
            .setThumbnail(`https://i.pinimg.com/originals/fe/e0/24/fee0246d3c4bddd06e95b41afbf13024.png`)
            .setFooter(bot.user.username, bot.user.displayAvatarURL());


            const misc = new MessageEmbed()
            .setAuthor(bot.user.username, bot.user.displayAvatarURL())
            .setTitle('Akinator | Miscellaneous')
            .setColor('GOLD')
            .setThumbnail(`https://i.pinimg.com/originals/fe/e0/24/fee0246d3c4bddd06e95b41afbf13024.png`)
            .setDescription(`Here are some miscellaneous commands of Akinator. Check the full list of [commands](https://bit.ly/akinator-commands).`)
            .addField(`<a:thonk:867403091149979658> ping`, `Returns the ping of Akinator.`, true)
            .addField(`<a:thonk:867403091149979658> stats`, `Returns the bot statistics.`, true)
            .addField(`<a:thonk:867403091149979658> invite`, `Returns the invite link of Akinator.`, true)
            .addField(`<a:thonk:867403091149979658> vote`, `Returns the vote links for Akinator`, true)
            .addField(`<a:thonk:867403091149979658> donate`, `Returns the patreon link of Akinator.`, true)
            .addField(`<a:thonk:867403091149979658> fans`, `Returns the Official Akinator server link.`, true)
            .setAuthor(bot.user.username, bot.user.displayAvatarURL())
            .setFooter(bot.user.username, bot.user.displayAvatarURL());

    

// Message event
const embed = new MessageEmbed()
            .setColor("GOLD")
            .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL())
            .setThumbnail(bot.user.displayAvatarURL())   

if(!args[0]) {

let pages = [main, sound, lang, config, mod, misc] 
// (or) let pages = ['page1', 'page2']

simplydjs.embedPages(bot, message, pages, {
    forwardEmoji: '👉', // default: ⏩
    backEmoji: '👈', // default: ⏪
  color: 'grey' // default: blurple 

 // Colors that discord-buttons support. like red, blurple, grey, green
})
} else {
    let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
    if (!command) return message.lineReplyNoMention(embed.setTitle("Invalid command!").setDescription(`Type \`${prefix}help\` for the list of the commands!`))
    command = command.config
    embed.setDescription(stripIndents`Akinator's global prefix - \`${PREFIX}\`\n
    Server prefix - \`${prefix}\`\n
    ** Command -** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}\n
    ** Description -** ${command.description || "No Description provided."}\n
    ** Usage -** ${command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : "No Usage"}\n
    ** Aliases -** ${command.aliases ? command.aliases.join(", ") : "None."}`)
    embed.setFooter(message.guild.name, message.guild.iconURL())

    return message.lineReplyNoMention(embed)
}

// Or u can do without options like


    }
}