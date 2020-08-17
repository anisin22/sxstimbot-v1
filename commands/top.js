const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fetch = require('node-fetch');
const querystring = require('querystring');
const trim = (str, max) => str.length > max ? `${str.slice(0, max - 3)}...` : str;

module.exports = {
    name: 'top',
	description: 'Lets you see the top anime/manga/airing anime/upcoming anime',
	aliases: ['topcharts', 'list', 'animeranks'],
	usage: '<anime/manga/airing/upcoming> <optional: number of results (default is 5)>',
    args: true,
	async execute(message, args) {
        if (args[0].toLowerCase() === 'anime') {
			const query = 'https://api.jikan.moe/v3/top/anime/1';

		const topanime  = await fetch(query).then(response => response.json()).then(json => json.top);
		if (topanime == null) {
			return message.channel.send(`No results found for **${args.join(' ')}**.`);
		}
		const lengthOfA = topanime.length;
		let inter = 0;
		if(lengthOfA >= 5){inter = 5}
		else{inter = lengthOfA}
		if (!isNaN(args[1])){if(lengthOfA >= args[1] ){inter = args[1]} else{inter = args[1]}}
		var i;
		for(i = 0; i < inter; i++){
			message.channel.send(`***` + 'Rank: ' + topanime[i].rank + `***`);
			const embed = new Discord.MessageEmbed()
            	.setColor('RANDOM')
				.setTitle(topanime[i].title)
				.setURL(topanime[i].url)
				.setThumbnail(topanime[i].image_url)
				.addField('Type', topanime[i].type)
				.addField('Episodes', topanime[i].episodes)
				.addField('Start Date', topanime[i].start_date)
				.addField('End Date', topanime[i].end_date)
				.addField('Score', `${topanime[i].score}/10`)
				.setTimestamp()
				.setFooter('SxStim Bot');

				message.channel.send(embed);
		}
		return;
		}
		if (args[0].toLowerCase() === 'manga') {
			const query = 'http://api.jikan.moe/v3/top/manga/1';

		const topmanga  = await fetch(query).then(response => response.json()).then(json => json.top);
		if (topmanga == null) {
			return message.channel.send(`No results found for **${args.join(' ')}**.`);
		}
		const lengthOfA = topmanga.length;
		let inter = 0;
		if(lengthOfA >= 5){inter = 5}
		else{inter = lengthOfA}
		if (!isNaN(args[1])){if(lengthOfA >= args[1] ){inter = args[1]} else{inter = args[1]}}
		var i;
		for(i = 0; i < inter; i++){
			message.channel.send(`***` + 'Rank: ' + topmanga[i].rank + `***`);
			const embed = new Discord.MessageEmbed()
            	.setColor('RANDOM')
				.setTitle(topmanga[i].title)
				.setURL(topmanga[i].url)
				.setThumbnail(topmanga[i].image_url)
				.addField('Type', topmanga[i].type)
				.addField('Volumes', topmanga[i].volumes)
				.addField('Start Date', topmanga[i].start_date)
				.addField('End Date', topmanga[i].end_date)
				.addField('Score', `${topmanga[i].score}/10`)
				.setTimestamp()
				.setFooter('SxStim Bot');

				message.channel.send(embed);
		}
		return;
		}
		if (args[0].toLowerCase() === 'upcoming') {
			const query = 'https://api.jikan.moe/v3/top/anime/1/upcoming';

		const topup  = await fetch(query).then(response => response.json()).then(json => json.top);
		if (topup == null) {
			return message.channel.send(`No results found for **${args.join(' ')}**.`);
		}
		const lengthOfA = topup.length;
		let inter = 0;
		if(lengthOfA >= 5){inter = 5}
		else{inter = lengthOfA}
		if (!isNaN(args[1])){if(lengthOfA >= args[1] ){inter = args[1]} else{inter = args[1]}}
		var i;
		for(i = 0; i < inter; i++){
			message.channel.send(`***` + 'Rank: ' + topup[i].rank + `***`);
			const embed = new Discord.MessageEmbed()
            	.setColor('RANDOM')
				.setTitle(topup[i].title)
				.setURL(topup[i].url)
				.setThumbnail(topup[i].image_url)
				.addField('Type', topup[i].type)
				.addField('Episodes', topup[i].episodes)
				.addField('Start Date', topup[i].start_date)
				.addField('End Date', topup[i].end_date)
				.setTimestamp()
				.setFooter('SxStim Bot');

				message.channel.send(embed);
		}
		return;
		}
		if (args[0].toLowerCase() === 'airing') {
			const query = 'https://api.jikan.moe/v3/top/anime/1/airing';

		const topair  = await fetch(query).then(response => response.json()).then(json => json.top);
		if (topair == null) {
			return message.channel.send(`No results found for **${args.join(' ')}**.`);
		}
		const lengthOfA = topair.length;
		let inter = 0;
		if(lengthOfA >= 5){inter = 5}
		else{inter = lengthOfA}
		if (!isNaN(args[1])){if(lengthOfA >= args[1] ){inter = args[1]} else{inter = args[1]}}
		var i;
		for(i = 0; i < inter; i++){
			message.channel.send(`***` + 'Rank: ' + topair[i].rank + `***`);
			const embed = new Discord.MessageEmbed()
            	.setColor('RANDOM')
				.setTitle(topair[i].title)
				.setURL(topair[i].url)
				.setThumbnail(topair[i].image_url)
				.addField('Type', topair[i].type)
				.addField('Episodes', topair[i].episodes)
				.addField('Start Date', topair[i].start_date)
				.addField('End Date', topair[i].end_date)
				.addField('Score', `${topair[i].score}/10`)
				.setTimestamp()
				.setFooter('SxStim Bot');

				message.channel.send(embed);
		}
		return;

		}if (args[0].toLowerCase() != 'airing' || "upcoming" || "manga" || "anime"){
			message.channel.send("Please add airing, upcoming, manga, or anime");
		}
	},
};