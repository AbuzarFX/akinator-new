const { PREFIX } = require("../../config")
const { MessageEmbed } = require("discord.js")
const db = require("../../reconDB")
module.exports = {
    config: {
        name: "lang",
        aliases: ["language"],
        description: `Shows all the available languages in Akinator.`,
   
    },
    run: async (bot, message, args) => {
        message.react("🤔")
        let prefix;
        let fetched = await db.get(`prefix_${message.guild.id}`);

        if (fetched === undefined) {
            prefix = PREFIX
        } else {
            prefix = fetched
        }
      
        const embed = new MessageEmbed()
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
        

        message.lineReplyNoMention(embed)
    
    }
}
