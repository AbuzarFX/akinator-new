const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js")
module.exports.userNotInChannel = (message) => {
  let embed = new MessageEmbed()
      .setTitle('Error')
  .setColor("GOLD")
  .setDescription(` ${message.author} Join a voice channel before using this command.`);
  message.lineReplyNoMention(embed);
};
