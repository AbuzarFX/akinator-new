const { Client, Collection, MessageEmbed } = require("discord.js")

const bot = new Client();
module.exports = bot;
const { PREFIX, TOKEN } = require("./config")
const db = require("./reconDB")
const DBL = require("dblapi.js");
require("discord-reply")
require("discord-buttons")(bot)
//Defining Collections


bot.commands = new Collection();
bot.aliases = new Collection();




["commands", "aliases"].forEach(x => bot[x] = new Collection());
["command", "event"].forEach(x => require(`./handler/${x}`)(bot));


const dbl = new DBL('TBL_TOKEN', bot);
dbl.on('posted', () => {
  console.log('Server count posted!');
})

dbl.on('error', e => {
console.log(`Oops! ${e}`);
})

bot.on("message", async message => {
    if (message.author.bot || message.channel.type === "dm") return;
    
    //Prefix fetching for each guild to support multi guild changeable prefix
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

    //On mentioning the bot it will display the message [My prefix : PREFIX for the paticular guild]
    try{
        if(message.content.includes(bot.user.id) && !message.content.includes("@everyone") && !message.content.includes("@here")  && !message.author.bot) {
    
            const embed = new MessageEmbed()
            .setAuthor(bot.user.username, bot.user.displayAvatarURL())
            .setTitle("<:Akinator:853909596053831690> My configuration for this guild are: ")
            .setDescription(`My prefix in the server \`[${message.guild.name}]\` is: \`${prefix}\`\n\nUse \`${prefix}help\` for more information.`)
            .setColor("GOLD")

            message.lineReplyNoMention(embed)
        
        }
    }

    catch(e) {
        console.log(e)
    }

})




bot.on('guildCreate', guild => {
     try {
        const { MessageEmbed } = require("discord.js")
        const embed = new MessageEmbed()
        .setTitle(`Thanks for adding me to your server! <:Akinator:853909596053831690>`)
        .setColor("GOLD")
        .setDescription(`Thank you for adding me to your server! I will guess the person/object that you are thinking of! Check out Akinator's [website](https://bit.ly/aki-discord) and the list of [commands](https://bit.ly/akinator-commands). Get started by typing \`aki help\`.`)
        .setThumbnail(bot.user.displayAvatarURL())
        .addField(`\u200b`, `[Support Server](https://discord.gg/YpVQNV8ckH) • [Invite Link](https://discord.com/oauth2/authorize?client_id=804789290139385887&permissions=2050780656&scope=applications.commands%20bot) • [Vote](https://top.gg/bot/804789290139385887/vote)`)
        .setFooter(`DM Abuser#7812 For direct assistance.`)
      const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES', 'EMBED_LINKS'))
      channel.send(embed)
     }catch(err) {
         console.log(err)
     }
})

process.on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
  });



bot.login(TOKEN)


