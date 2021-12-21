const { MessageEmbed } = require('discord.js');

module.exports = {
config: {
    name: 'serverinfo',
    description: `Returns the server information.`,
    usage: ``,
    aliases: ['svi']
},
run: async(bot, message, args) => {
    message.react("🤔")
    const channels = message.guild.channels.cache.array();
    const textChannels = channels.filter(c => c.type === 'text').length;
    const voiceChannels = channels.filter(c => c.type === 'voice').length;
    const categoryChannels = channels.filter(c => c.type === 'category').length


  const region = {
    'us-central': `US Central`,
    'us-east': `US East`,
    'us-south': `US South`,
    'us-west': `US West`,
    'europe': `Europe`,
    'singapore': `Singapore`,
    'japan': `Japan`,
    'russia': `Russia`,
    'hongkong': `Hong Kong`,
    'brazil': `Brazil`,
    'sydney': `Sydney`,
    'southafrica': `South Africa`,
    'india': `India`,
    'europe': `Europe`
};

const verificationLevels = {
    NONE: 'None',
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    VERY_HIGH: 'Very High'
};

let system = message.guild.systemChannelID ? `<#${message.guild.systemChannelID}>` : "`None`";
let rules = message.guild.rulesChannelID ? `<#${message.guild.rulesChannelID}>` : "`None`";
    const embed = new MessageEmbed()
    .setColor("GOLD")
        .setAuthor(message.guild.name, message.guild.iconURL)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addField("Name", `\`${message.guild.name}\``, true)
        .addField("ID", `\`${message.guild.id}\``, true)
        .addField('Verification Level', `\`${verificationLevels[message.guild.verificationLevel]}\``, true)
        .addField("Members", `\`${message.guild.memberCount}\``, true)
        .addField('Highest Role', message.guild.roles.highest, true)
        .addField('Emoji Count', `\`${message.guild.emojis.cache.size}\``, true)
        .addField('Region', `\`${region[message.guild.region]}\``, true)
        .addField('Partnered', `\`${message.guild.partnered}\``, true)
        .addField('Verified', `\`${message.guild.verified}\``, true)
        .addField('Boosts', `\`${message.guild.premiumSubscriptionCount >= 1 ? `${message.guild.premiumSubscriptionCount}` : `0`}\``, true)
        .addField('Categories', `\`${categoryChannels}\``, true)
        .addField("Roles", `\`${message.guild.roles.cache.size}\``, true)
                .addField("System Channel", system, true)
                .addField("Rules Channel", rules, true)
        .addField("Creation Date", `\`${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})\``, true)
                .addField(`Channel Count`, `Total: \`${message.guild.channels.cache.size}\` || Text: \`${textChannels}\` | Voice: \`${voiceChannels}\``, true)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
    message.lineReplyNoMention(embed);
    }
}

function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
};