const { MessageEmbed } = require("discord.js");
const  { Aki } = require("aki-api");
const emojis = ["👍", "👎", "❔", "🤔", "🙄", "❌"];
const Started = new Set();
const { PREFIX } = require("../../config")
const db = require("../../reconDB")
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


module.exports = {
config: {
    name: 'start',
    usage: '',
    description: 'Think about a real or a fictional character and I will try to guess it.',
    acessableby: 'everyone'
},
run: async(bot, message, args) => {
    

    if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.lineReplyNoMention({ embed: {
        color: "GOLD",
        description: "<:deny:867399255472078868> | I'm missing the `Manage Messages` permission for this command!"
    }})

   if (!message.channel.permissionsFor(bot.user).has('MANAGE_MESSAGES')) return message.lineReplyNoMention({ embed: {
        color: "GOLD",
       description: "<:deny:867399255472078868> | I'm missing the `Manage Messages` permission for this command!"
    }})


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


    const sendMsg = await message.channel.send({ embed: {
        color: "GOLD",
        description: `<a:thonk:867403091149979658> Please wait for all of the reactions to load. Type \`${prefix}lang\` for the list of languages available.`
    }});  

    try {
        let data = await db.get(`lang_${message.guild.id}`)
        if(data === undefined) data = `en`
        if(!args[0]) {
			args[0] = `${data}` || `en`
		}else if(args[0] && !langs.includes(args[0])){
			message.channel.send({ embed: {
				color: "GOLD",
				description: `Invalid language code! Run \`${prefix}language\` for the language codes. Switching back to \`en\``
			}}).then(msg => {
				msg.delete({timeout: 7000})
			})
			args[0] = `en`
        }

        
  

        const aki = new Aki(args[0]);
        message.react("🤔") // Full languages list at: https://github.com/jgoralcz/aki-api
          await aki.start();
          sendMsg.delete({ timeout: 10000 });
          const msg = await message.lineReplyNoMention(new MessageEmbed()
                                           .setAuthor(message.author.username, bot.user.displayAvatarURL())
                                           .setTitle(`${message.author.username}, Question ${aki.currentStep + 1}`)
                                           .setColor("GOLD")
                                           .setThumbnail(`https://i.pinimg.com/originals/fe/e0/24/fee0246d3c4bddd06e95b41afbf13024.png`)
                                           .setDescription(`**${aki.question}**\n${aki.answers.map((x, i) => `${x} — ${emojis[i]}`).join("\n\n")}`));
      for(let emoji of emojis)await msg.react(emoji).catch(console.error);
      const collector = msg.createReactionCollector((reaction, user) => emojis.includes(reaction.emoji.name) && user.id === message.author.id,{ time: 60000 * 6 });
          collector.on("collect", async (reaction, user) => {
          reaction.users.remove(user).catch(console.error)
      if(reaction.emoji.name == "❌")return collector.stop();
      
      await aki.step(emojis.indexOf(reaction.emoji.name));
      if (aki.progress >= 70 || aki.currentStep >= 78) {
              await aki.win();
              collector.stop();
              message.channel.send(new MessageEmbed()
              .setTitle(`Is this your character?`)
              .setDescription(`**${aki.answers[0].name}**\n${aki.answers[0].description}\nRanking as **#${aki.answers[0].ranking.toLocaleString()}**\n\nIs this your character? \n[Type yes (**y**) / no (**n**)]`)
              .addField("No. of questions", `**${aki.currentStep}**`, true)
              .setImage(aki.answers[0].absolute_picture_path || null)
              .setColor("GOLD"));
      message.channel.awaitMessages(response => ["yes","y","no","n"].includes(response.content.trim().toLowerCase()) &&
      response.author.id == message.author.id, { max: 1, time: 30000, errors: ["time"] })
            .then(collected => {
               const content = collected.first().content.trim().toLowerCase();
                  if (content == "y" || content == "yes")
                       return message.lineReplyNoMention(new MessageEmbed()
                        .setColor("GOLD")
                        .setTitle("Great! Guessed it right one more time.")
                        .setDescription("I enjoyed playing with you!"));
                  else 
                      return message.lineReplyNoMention(new MessageEmbed()
                        .setColor("GOLD")
                        .setTitle("Uh, you win")
                        .setDescription("I enjoyed playing with you!"));
                });
                
              return;
            }
             msg.edit(new MessageEmbed()
                      .setTitle(`${message.author.username}, Question ${aki.currentStep + 1}`)
                      .setAuthor(message.author.username, bot.user.displayAvatarURL())
                      .setThumbnail(`https://i.pinimg.com/originals/fe/e0/24/fee0246d3c4bddd06e95b41afbf13024.png`)
                      .setColor("GOLD")
                      .setDescription(`**${aki.question}**\n${aki.answers.map((x, i) => `${x} — ${emojis[i]}`).join("\n\n")}`));
       });
      
      
      collector.on("end",()=>{ Started.delete(message.author.id);
        msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
        msg.edit({ embed: {
            color: "GOLD",
            description: "Game ended."
        }}).catch(()=>{}) ;
                            })
    } catch(err) {
        message.channel.send(`Error: ${err}`)
    }
    }};   
    