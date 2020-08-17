const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fetch = require('node-fetch');
const querystring = require('querystring');
const trim = (str, max) => str.length > max ? `${str.slice(0, max - 3)}...` : str;

module.exports = {
    name: 'anime',
	description: 'Lets you search and watch anime',
	aliases: ['animesearch'],
	usage: '<anime>',
    args: true,
	async execute(message, args) {
        const query = 'https://api.gdriveplayer.us/v1/animes/search?title=' + args.join('%20');

		const anime  = await fetch(query).then(response => response.json());
		if (anime == null) {
			return message.channel.send(`No results found for **${args.join(' ')}**.`);
		}
		const lengthOfA = anime.length;
		var i;
		for(i = 0; i < lengthOfA; i++){
			let msg = anime[i].player_url
			let pos = msg.search('{')
			let spli = msg.slice(pos)
			let n = msg.replace(spli, 1)
		
			try{
        		const embed = new Discord.MessageEmbed()
            	.setColor('RANDOM')
            	.setTitle(anime[i].title)
				.setThumbnail(anime[i].poster)
				.addField('Genre', anime[i].genre)
				.addField('Summary', trim(anime[i].summary, 1024))
				.addField('Status', anime[i].status)
				.addField('Type', anime[i].type)
				.addField('Episodes', anime[i].total_episode)
				.addField('Link to watch', n)
				.setTimestamp()
				.setFooter('If you want to change episode just replace the last number in the url');

				message.channel.send(embed);
			}catch (error) {
				console.error(error);
				const embedn = new Discord.MessageEmbed()
            	.setColor('RANDOM')
            	.setTitle(anime[i].title)
				.setThumbnail(anime[i].poster)
				.addField('Episodes', anime[i].total_episode)
				.addField('Link to watch', n)
				.setTimestamp()
				.setFooter('If you want to change episode just replace the last number in the url');
				message.channel.send(embedn);
			}
		}
	},
};
