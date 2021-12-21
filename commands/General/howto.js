const simplydjs = require('simply-djs')
const { MessageEmbed, Message } = require('discord.js');
const { PREFIX } = require("../../config")
const db = require("../../reconDB")
module.exports = {
    config: {
        name: "howto",
    },
    run: async (bot, message, args) => {
        message.react("🤔")

        //if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.lineReplyNoMention({ embed: {
           // color: "GOLD",
           // description: "<:deny:867399255472078868> | I'm missing the `Manage Messages` permission for this command!"
       // }})
    
       // if (!message.channel.permissionsFor(bot.user).has('MANAGE_MESSAGES')) return message.lineReplyNoMention({ embed: {
       //     color: "GOLD",
          //  description: "<:deny:867399255472078868> | I'm missing the `Manage Messages` permission for this command!"
      //  }})



            let prefix;
    try {
        let fetch = await db.get(`prefix_${message.guild.id}`)
        if(fetch === undefined) {
            prefix = PREFIX
        }

        else {
            prefix = fetch
        }
    }
    catch(e) {
        console.log(e) //console logging any error
    };
        
        const first = new MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .setTitle(`How do I play with Akinator?`)
        .setDescription(`Akinator's all-consuming passion is trying to guess characters by asking questions.\n

        To play with him, think of a character, real or fictional, keep it well in mind and then run the command \`${prefix}start\`\n
        
        Akinator will then proceed to ask you a series of questions that you'll have to answer as truthfully as possible. After this series of questions, he will tell you what you were thinking of.`)
        .setColor('GOLD')
        .setImage(`https://imgur.com/6cDO7yf.jpg`)
        .setFooter(`Akinator | How-to`)
        .setTimestamp()




        const third = new MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .setTitle(`How can I add a character?`)
        .setColor('GOLD')
        .setDescription(`You can add a missing character to Akinator's database by joining its [official server](https://discord.gg/YpVQNV8ckH) and typing \`a!suggest <character name>\` and the developer will add it as soon as possible.`)
        .setFooter(`Akinator | How-to`)
        .setImage(`https://imgur.com/JGOCU8v.jpg`)
        .setTimestamp()

        const fourth = new MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .setTitle(`How do you change the language?`)
        .setColor(`GOLD`)
        .setDescription(`To get a list of all the available languages, type ${prefix}language\nType **${prefix}start <language>** to pick one!\nExample: **${prefix}start ru** or **${prefix}start es**\n\nTo make the change for your whole server, type **${prefix}set-lang <language code>**, like so: **${prefix}set-lang es**`)
        .addField(`• Entire server`, `\`${prefix}set-lang fr\``, true)
        .addField(`• To pick one`, `\`${prefix}start fr\``, true)
        .setTimestamp()

        const fifth = new MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .setTitle(`How do you change the Prefix?`)
        .setColor(`GOLD`)
        .setDescription(`**NEW!** T change the default prefix of Akinator, use the command \`${prefix}prefix [new prefix]\``)
        .addField(`• Usage`, `\`${prefix}prefix !aki\``)
        .setTimestamp()

       

        let pages = [fourth, first, third, fifth] 
// (or) let pages = ['page1', 'page2']

simplydjs.embedPages(bot, message, pages, {
  forwardEmoji: '👉', // default: ⏩
  backEmoji: '👈', // default: ⏪
  color: 'blurple' // default: blurple 

 // Colors that discord-buttons support. like red, blurple, grey, green
})
    
        


    }
}
