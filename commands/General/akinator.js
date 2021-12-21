const { MessageEmbed } = require('discord.js');
const { Aki } = require('aki-api');
const { list, verify } = require('../../functions');
const { PREFIX } = require("../../config")
const db = require("../../reconDB")
const regions = ['person', 'object', 'animal'];

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
		name: 'akinator',
		aliases: ['aki', 'guesswho'],
		category: 'games',
		usage: '[person | object | animal]',
		description: 'Think About A Real or Fictional Character, I Will Try To Guess It',
		acessableby: 'everyone'
	},
	run: async (bot, message, args, ops) => {
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


		if (!message.channel.permissionsFor(bot.user).has('EMBED_LINKS')) return message.lineReplyNoMention({ embed: {
		color: 'GOLD',
		description: "I'm missing the `Embed Links` permission!",
		}});
		if (!args[0]) return message.lineReplyNoMention({ embed: {
            color: "GOLD",
            description: `What category do you want to use? Either \`${list(regions, 'or')}\`!\n\n**Example:** \`aki aki [person/object/animal]\``
        }});
		let stringAki = args[0].toLowerCase();
		if(langs.includes(args[1])) {
			let region = args[1];
		}else if(!args[1]) {
			args[1] = `en`
		}else if((!langs.includes(args[1]))){
			message.channel.send({ embed: {
				color: "GOLD",
				description: `Invalid language code! Run \`${prefix}lang\` for the language codes. Switching back to \`en\``
			}}).then(msg => {
				msg.delete({timeout: 5000})
			})
			args[1] = `en`
		}
		if (stringAki === 'person'.toLocaleLowerCase()) region = args[1];
		if (stringAki === 'object'.toLocaleLowerCase()) region = `${args[1]}_objects`;
		if (stringAki === 'animal'.toLocaleLowerCase()) region = `${args[1]}_animals`;
		if (!regions.includes(stringAki)) return message.lineReplyNoMention({ embed: {
            color: "GOLD",
            description: `**what region do you want to use? Either \`${list(regions, 'or')}\`!**\n\n**Example:** \`aki aki [person/object/animal]\``
        }});
		const current = ops.games.get(message.channel.id);
		if (current) return message.lineReplyNoMention({ embed: {
            color: "GOLD",
            description: `<:deny:867399255472078868> | Please wait until the current game of \`${current.name}\` is finished!`
        }});
		try {
			const aki = new Aki(region);
			let ans = null;
			let win = false;
			let timesGuessed = 0;
			let guessResetNum = 0;
			let wentBack = false;
			let forceGuess = false;
			const guessBlacklist = [];
			ops.games.set(message.channel.id, { name: 'akinator' });
			while (timesGuessed < 3) {
				if (guessResetNum > 0) guessResetNum--;
				if (ans === null) {
					await aki.start();
				} else if (wentBack) {
					wentBack = false;
				} else {
					try {
						await aki.step(ans);
					} catch {
						await aki.step(ans);
					}
				}
				if (!aki.answers || aki.currentStep >= 79) forceGuess = true;
				const answers = aki.answers.map(answer => answer.toLowerCase());
				answers.push('end');
				if (aki.currentStep > 0) answers.push('back');
				const embed = new MessageEmbed()
					.setColor('GOLD')
					.setDescription(`**Question ${aki.currentStep + 1}**\n**${aki.question}**\n[${aki.answers.join(' / ')}${aki.currentStep > 0 ? ` / Back` : ''} / End]`)
				await message.lineReplyNoMention(embed)
				const filter = res => res.author.id === message.author.id && answers.includes(res.content.toLowerCase());
				const messages = await message.channel.awaitMessages(filter, {
					max: 1,
					time: 30000
				});
				if (!messages.size) {
					await message.channel.send({ embed: {
                        color: "GOLD",
                        description: `Time's up!`
                    }});
					win = 'time';
					break;
				}
				const choice = messages.first().content.toLowerCase();
				if (choice.toLowerCase() === 'end'.toLocaleLowerCase()) {
					forceGuess = true;
				} else if (choice.toLowerCase() === 'back'.toLocaleLowerCase()) {
					if (guessResetNum > 0) guessResetNum++;
					wentBack = true;
					await aki.back();
					continue;
				} else {
					ans = answers.indexOf(choice);
				}
				if ((aki.progress >= 90 && !guessResetNum) || forceGuess) {
					timesGuessed++;
					guessResetNum += 10;
					await aki.win();
					const guess = aki.answers.filter(g => !guessBlacklist.includes(g.id))[0];
					if (!guess) {
						await message.channel.send({ embed: {
                            color: "GOLD",
                            description: 'I can\'t think of anyone!'
                        }});
						win = true;
						break;
					}
					guessBlacklist.push(guess.id);
					const embed = new MessageEmbed()
						.setColor('GOLD')
						.setTitle(`Is this your character?`)
						.setDescription(`**${guess.name}**\n${guess.description}\nRanking as **#${guess.ranking.toLocaleString()}**\n\nIs this your character?\n[Type yes (**y**) / no (**n**)]`)
						.setImage(guess.absolute_picture_path || null)
						.setFooter(forceGuess ? 'Final Guess' : `Guesses - ${timesGuessed}`);
					await message.channel.send(embed);
					const verification = await verify(message.channel, message.author);
					if (verification === 0) {
						win = 'time';
						break;
					} else if (verification) {
						win = false;
						break;
					} else {
						const exmessage = timesGuessed >= 3 || forceGuess ? `I give up!` : `I can keep going!`;
						await message.channel.send({ embed: {
                            color: "GOLD",
                            description: `Is that so? ${exmessage}`
                        }});
						if (timesGuessed >= 3 || forceGuess) {
							win = true;
							break;
						}
					}
				}
			}
			ops.games.delete(message.channel.id);
			if (win === 'time') return message.lineReplyNoMention({ embed: {
                color: "GOLD",
                description: '<:akinator:830071026892668939> | I guess your silence means I have won!'
            }});
			if (win) return message.channel.send({ embed: {
                color: "GOLD",
                description: '<:akinator:830071026892668939> | You have defeated me this time!'	
            }});
			return message.lineReplyNoMention({ embed: {
                color: "GOLD",
                description: 'Guessed it right one more time! I loved playing with you! <:akinator:867314102996172840>'
            }});
		} catch (err) {
			ops.games.delete(message.channel.id);
			return message.channel.send(`Oh no! An error occured: \`${err.message}\`\nPlease try again!`);
		};
	}
};
