const errors = require('../../util/errors');

const { MessageEmbed } = require('discord.js');

module.exports = {
config: {
    name: 'startup',
},
run: async(bot, message, args) => {
    if (!message.member.voice.channel) {
        return errors.userNotInChannel(message);
      } else {
        message.member.voice.channel.join().then(connection => {
          message.lineReplyNoMention({ embed: { 
              color: "GOLD",
              description: `${message.author} has issued the \`${module.exports.config.name}\` command.`
          }})
          const dispatcher = connection.play('././effects/startup.mp3');
    
          dispatcher.on('end', end => {
            message.member.voice.channel.leave();
          });
        })
      }
    }
}