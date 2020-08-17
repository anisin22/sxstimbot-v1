const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fetch = require('node-fetch');
const querystring = require('querystring');
const trim = (str, max) => str.length > max ? `${str.slice(0, max - 3)}...` : str;

module.exports = {
    name: 'season',
	description: 'Lets you search up any anime season and lists all the anime that season, also can list upcoming anime',
	aliases: ['seasonsearch'],
	usage: '<year> <season> <optional: number of results (default is 5)> or <tba> <optional: number of results (default is 5)>',
    args: true,
	async execute(message, args) {
		
        if (args[0].toLowerCase() == 'tba') {
			const query = 'https://api.jikan.moe/v3/season/later';

		const seasoninfo  = await fetch(query).then(response => response.json()).then(json => json.anime);
		if (seasoninfo == null) {
			return message.channel.send(`No results found for **${args.join(' ')}**.`);
		}
		const lengthOfA = seasoninfo.length;
		let inter = 0;
		if(lengthOfA >= 5){inter = 5}
		else{inter = lengthOfA}
		if (!isNaN(args[1])){if(lengthOfA >= args[1] ){inter = args[1]} else{inter = args[1]}}
		var i;
		for(i = 0; i < inter; i++){
			const lengthOfG = seasoninfo[i].genres.length;
			var j;
			season_genre = '';
			for(j=0; j< lengthOfG; j++){
				season_genre = season_genre + seasoninfo[i].genres[j].name + ', ';
			}
			try{
			var airdate = seasoninfo[i].airing_start;
            var pos = airdate.indexOf('T');
            var air_date = airdate.slice(0,pos);
			const embed = new Discord.MessageEmbed()
            	.setColor('RANDOM')
				.setTitle(seasoninfo[i].title)
				.setURL(seasoninfo[i].url)
				.setThumbnail(seasoninfo[i].image_url)
				.addField('Summary', trim(seasoninfo[i].synopsis, 1024))
				.addField('Source', seasoninfo[i].source)
				.addField('Genres', season_genre)
				.addField('Type', seasoninfo[i].type)
				
				.addField('Start Date', air_date)
				.setTimestamp()
				.setFooter('SxStim Bot');

				 message.channel.send(embed);
			}catch (error) {
				const embedn = new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setTitle(seasoninfo[i].title)
				.setURL(seasoninfo[i].url)
				.setThumbnail(seasoninfo[i].image_url)
				.addField('Summary', trim(seasoninfo[i].synopsis, 1024))
				.addField('Source', seasoninfo[i].source)
				.addField('Genres', season_genre)
				.addField('Type', seasoninfo[i].type)
				
				.addField('Start Date', seasoninfo[i].airing_start)
				.setTimestamp()
				.setFooter('SxStim Bot');
				 message.channel.send(embedn);
			}
		
		}
		return;
		}
		if (isNaN(args[0]) == true) {
			return message.channel.send('First term must be the year or tba');
		}
		let d = new Date();
		year = d.getFullYear() + 1;
		if(1960 > args[0] || args[0] > year) {
			return message.channel.send(`Please enter a year between 1960 and ${year}`);
		}
		if ((args[1] == null)) {
			return message.channel.send('Please enter a 2nd term, it must be a season: Winter, Summer, Fall, or Spring');
		}
		seasons = {winter: "winter" , summer :"summer", fall : "fall", spring : "spring"};
		if (args[1].toLowerCase() in seasons === false) {
			return message.channel.send('2nd term must be a season: Winter, Summer, Fall, or Spring');
		}
		
		
		const query = 'https://api.jikan.moe/v3/season/' + `${args[0]}/${args[1].toLowerCase()}`;

		const seasoninfo  = await fetch(query).then(response => response.json()).then(json => json.anime);
		if (seasoninfo == null) {
			return message.channel.send(`No results found for **${args.join(' ')}**.`);
		}
		const lengthOfA = seasoninfo.length;
		let inter = 0;
		if(lengthOfA >= 5){inter = 5}
		else{inter = lengthOfA}
		if (!isNaN(args[2])){if(lengthOfA >= args[2] ){inter = args[2]} else{inter = args[2]}}
		var i;
		for(i = 0; i < inter; i++){
			const lengthOfG = seasoninfo[i].genres.length;
			var j;
			season_genre = '';
			for(j=0; j< lengthOfG; j++){
				season_genre = season_genre + seasoninfo[i].genres[j].name + ', ';
			}
			try{
			var airdate = seasoninfo[i].airing_start;
            var pos = airdate.indexOf('T');
            var air_date = airdate.slice(0,pos);
			const embed = new Discord.MessageEmbed()
            	.setColor('RANDOM')
				.setTitle(seasoninfo[i].title)
				.setURL(seasoninfo[i].url)
				.setThumbnail(seasoninfo[i].image_url)
				.addField('Summary', trim(seasoninfo[i].synopsis, 1024))
				.addField('Source', seasoninfo[i].source)
				.addField('Genres', season_genre)
				.addField('Type', seasoninfo[i].type)
				.addField('Score', seasoninfo[i].score)
				.addField('Episodes', seasoninfo[i].episodes)
				.addField('Start Date', air_date)
				.setTimestamp()
				.setFooter('SxStim Bot');

				message.channel.send(embed);
			}catch (error) {
				const embedn = new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setTitle(seasoninfo[i].title)
				.setURL(seasoninfo[i].url)
				.setThumbnail(seasoninfo[i].image_url)
				.addField('Summary', trim(seasoninfo[i].synopsis, 1024))
				.addField('Source', seasoninfo[i].source)
				.addField('Genres', season_genre)
				.addField('Type', seasoninfo[i].type)
				.addField('Score', seasoninfo[i].score)
				.addField('Episodes', seasoninfo[i].episodes)
				.addField('Start Date', seasoninfo[i].airing_start)
				.setTimestamp()
				.setFooter('SxStim Bot');
				message.channel.send(embedn);
			}
		
		}
	},
};