const db = require("../../reconDB")
const { MessageEmbed } = require("discord.js")
const langs = [
	"en",
	"ar",
	"fr",
	"cn",
	"de",
	"es",
	"it",
	"jp",
	"kr",
	"nl",
	"pl",
	"pt",
	"ru",
	"tr",
	"id"
];

const { LANG, PREFIX } = require("../../config")


module.exports = {
    config: {
        name: "set-lang",
        description: "change/know the server's default language.",
        usage: "[es/fr/pt]",
        aliases: ["set-language"]
    },

    run: async (bot, message, args) => {
      message.react("🤔")
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



      try {
        let option = args[0];

          //PERMISSION
   if(!message.member.hasPermission("MANAGE_GUILD")) {
       
              return message.lineReplyNoMention({ embed: {
                color: "GOLD",
                description: "<:deny:867399255472078868> | You don't have the required permissions to use this command!"
              }})
            }
          
          if(!option) {
              let lang = await db.get(`lang_${message.guild.id}`)
              if (!lang) lang = LANG;
              let prefEmbed = new MessageEmbed()
              .setColor('GOLD')
              .setThumbnail(bot.user.displayAvatarURL())
              .setDescription(`My default language for \`[${message.guild.name}]\` is: \`${lang}\`\n\nTo change/reset it, type \`${prefix}set-lang [reset/language code]\`\nFor example: **${prefix}set-lang ru**`)
            
            message.lineReplyNoMention(prefEmbed);
          }

          if(option.toLowerCase() === "reset") {
             try {
              db.set(`lang_${message.guild.id}`, `en`)
              return await message.lineReplyNoMention({ embed: {
                color: "GOLD",
                description: `<:tick:867399309405323296> | Successfully reset the language to \`en\``
              }})
             } catch(err) {
              message.lineReplyNoMention(err.message)
             }
          }
          
          if(!langs.includes(args[0])) {
            return message.lineReplyNoMention({ embed: {
              color: "GOLD",
              description: `<:deny:867399255472078868> | The language doesn't exist. Type \`${prefix}lang\` to get the entire list of available languages.`
            }})
          }
          
          if(args[0].length > 3) {
            return message.lineReplyNoMention({ embed: {
              color: "GOLD",
              description: "<:deny:867399255472078868> | You cannot have a language code of more than 2 characters."
            }})
          }
          
          if(args.join("") === LANG) {
            db.delete(`lang_${message.guild.id}`)
           return await message.lineReplyNoMention({ embed: {
             color: "GOLD",
             description: "<:tick:867399309405323296> | Successfully reset the language to `en`"
           }})
          }
          
          db.set(`lang_${message.guild.id}`, args[0])
        await message.lineReplyNoMention({ embed: {
          color: "GOLD",
          description: `<:tick:867399309405323296> | Language successfully set to \`${args[0]}\``
        }})
      }
          catch(err) {
            console.log(err)
          }

      }
      
  }