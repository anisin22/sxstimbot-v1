const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fetch = require('node-fetch');
const querystring = require('querystring');
const trim = (str, max) => str.length > max ? `${str.slice(0, max - 3)}...` : str;

module.exports = {
    name: 'shows',
	description: 'Lets you search and watch tv shows',
	aliases: ['tv', 'show'],
	usage: '<tv show>',
    args: true,
	async execute(message, args) {
        const query = 'https://api.gdriveplayer.us/v2/series/search?title=' + args.join('%20');
		const show  = await fetch(query).then(response => response.json());
		const lengthOfS = show.length;
		var i;
		for(i = 0; i < lengthOfS; i++){
		
		const api = show[i].detail;
		const showinfo  = await fetch(api).then(response => response.json());
		
			try{
				const embed = new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setTitle(show[i].title)
				.setThumbnail(show[i].poster)
				.addField('Total Episodes', show[i].total_episode)
				.addField('Link to watch', showinfo[0].list_episode[0].player_url)
				.setTimestamp()
				.setFooter('If you want to change episode just replace the last number in the url');
				message.channel.send(embed);
			}catch (error) {
				console.error(error);
			
			}
		}
	},
};
