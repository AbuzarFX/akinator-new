const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');

module.exports = {
    config: {
        name: "os",
    },
    run: async (bot, message, args) => {
       
        message.react("🤔")



        const { totalMemMb, usedMemMb } = await mem.info();
        const serverStats = stripIndent`
      OS        :: ${await os.oos()}
      CPU       :: ${cpu.model()}
      Cores     :: ${cpu.count()}
      CPU Usage :: ${await cpu.usage()}%
      RAM       :: ${totalMemMb}MB
      RAM Usage :: ${usedMemMb}MB 

    `;
        const embed = new MessageEmbed()
        .setColor("GOLD")
        .setAuthor(`Bot Information`, bot.user.displayAvatarURL())
        .addField(`Name`, `\`Akinator\``, true)
        .addField(`ID`, `\`${bot.user.id}\``, true)
        .addField(`Owner`, `<@184280327131234306>`, true)
        .addField(`\u200b`, `\`\`\`asciidoc\n= Server Statistics =\n\n${serverStats}\`\`\``)

        message.lineReplyNoMention(embed)
       

            
    }
}