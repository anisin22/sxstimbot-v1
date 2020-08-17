const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fetch = require('node-fetch');
const querystring = require('querystring');
const trim = (str, max) => str.length > max ? `${str.slice(0, max - 3)}...` : str;

module.exports = {
    name: 'calender',
	description: 'Lists all the anime that is airing on a certain day for the current season',
	aliases: ['dailyanime', 'day'],
	usage: '<day of the week> <optional: number of results (default is 10)>',
    args: true,
	async execute(message, args) {
		days = {monday: "monday", tuesday:"tuesday", wednesday:"wednesday", thursday:"thursday", friday:"friday", saturday:"saturday", sunday:"sunday"};
		if(!(args[0].toLowerCase() in days)){
			return message.channel.send('Please enter a day of the week: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, or Sunday.');
		}
		
        if (args[0].toLowerCase() == 'monday') {
			const query = 'https://api.jikan.moe/v3/schedule/monday';

		const mondayinfo  = await fetch(query).then(response => response.json()).then(json => json.monday);
		if (mondayinfo == null) {
			return message.channel.send(`No results found for **${args.join(' ')}**.`);
        }
		const lengthOfA = mondayinfo.length;
		let inter = 0;
		if(lengthOfA >= 10){inter = 10}
		else{inter = lengthOfA}
		if (!isNaN(args[1])){if(lengthOfA >= args[1] ){inter = args[1]} else{inter = args[1]}}
		var i;
		message.channel.send('**'+"All the anime that release a new episode on Monday, for this season, are listed below: " + '**');

		for(i = 0; i < inter; i++){
			const lengthOfG = mondayinfo[i].genres.length;
			var j;
			season_genre = '';
			for(j=0; j< lengthOfG; j++){
				season_genre = season_genre + mondayinfo[i].genres[j].name + ', ';
			}
			if(lengthOfG == 0 ){
				season_genre = null;
			}
			try{
			var airdate = mondayinfo[i].airing_start;
			var pos = airdate.indexOf('T');
			var air_date;
			if(pos == -1){
				air_date = null;
			}
            air_date = airdate.slice(0,pos);
			const embed = new Discord.MessageEmbed()
            	.setColor('RANDOM')
				.setTitle(mondayinfo[i].title)
				.setURL(mondayinfo[i].url)
				.setThumbnail(mondayinfo[i].image_url)
				.addField('Summary', trim(mondayinfo[i].synopsis, 1024))
				.addField('Genres', season_genre)
				.addField('Episodes', mondayinfo[i].episodes)
				.addField('Type', mondayinfo[i].type)
				.addField('Start Date', air_date)
				.setTimestamp()
				.setFooter('SxStim Bot');

				message.channel.send(embed);
			}catch (error) {
				const embed = new Discord.MessageEmbed()
            	.setColor('RANDOM')
				.setTitle(mondayinfo[i].title)
				.setURL(mondayinfo[i].url)
				.setThumbnail(mondayinfo[i].image_url)
				.addField('Genres', season_genre)
				.addField('Episodes', mondayinfo[i].episodes)
				.addField('Type', mondayinfo[i].type)
				.addField('Start Date', air_date)
				.setTimestamp()
				.setFooter('SxStim Bot');

				message.channel.send(embed);
			}
		}

		}
		if (args[0].toLowerCase() == 'tuesday') {
			const query = 'https://api.jikan.moe/v3/schedule/tuesday';

		const mondayinfo  = await fetch(query).then(response => response.json()).then(json => json.tuesday);
		if (mondayinfo == null) {
			return message.channel.send(`No results found for **${args.join(' ')}**.`);
        }
        const lengthOfA = mondayinfo.length;
		let inter = 0;
		if(lengthOfA >= 10){inter = 10}
		else{inter = lengthOfA}
		if (!isNaN(args[1])){if(lengthOfA >= args[1] ){inter = args[1]} else{inter = args[1]}}
		var i;
		message.channel.send('**'+"All the anime that release a new episode on Tuesday, for this season, are listed below: " + '**');
		for(i = 0; i < inter; i++){
			const lengthOfG = mondayinfo[i].genres.length;
			var j;
			season_genre = '';
			for(j=0; j< lengthOfG; j++){
				season_genre = season_genre + mondayinfo[i].genres[j].name + ', ';
			}
			if(lengthOfG == 0 ){
				season_genre = null;
			}
			try{
			var airdate = mondayinfo[i].airing_start;
            var pos = airdate.indexOf('T');
            var air_date;
			if(pos == -1){
				air_date = null;
			}
            air_date = airdate.slice(0,pos);
			const embed = new Discord.MessageEmbed()
            	.setColor('RANDOM')
				.setTitle(mondayinfo[i].title)
				.setURL(mondayinfo[i].url)
				.setThumbnail(mondayinfo[i].image_url)
				.addField('Summary', trim(mondayinfo[i].synopsis, 1024))
				.addField('Genres', season_genre)
				.addField('Episodes', mondayinfo[i].episodes)
				.addField('Type', mondayinfo[i].type)
				.addField('Start Date', air_date)
				.setTimestamp()
				.setFooter('SxStim Bot');

				message.channel.send(embed);
			}catch (error) {
				const embed = new Discord.MessageEmbed()
            	.setColor('RANDOM')
				.setTitle(mondayinfo[i].title)
				.setURL(mondayinfo[i].url)
				.setThumbnail(mondayinfo[i].image_url)
				.addField('Genres', season_genre)
				.addField('Episodes', mondayinfo[i].episodes)
				.addField('Type', mondayinfo[i].type)
				.addField('Start Date', air_date)
				.setTimestamp()
				.setFooter('SxStim Bot');

				message.channel.send(embed);
			}
		}

		}
		if (args[0].toLowerCase() == 'wednesday') {
			const query = 'https://api.jikan.moe/v3/schedule/wednesday';

		const mondayinfo  = await fetch(query).then(response => response.json()).then(json => json.wednesday);
		if (mondayinfo == null) {
			return message.channel.send(`No results found for **${args.join(' ')}**.`);
        }
        const lengthOfA = mondayinfo.length;
		let inter = 0;
		if(lengthOfA >= 10){inter = 10}
		else{inter = lengthOfA}
		if (!isNaN(args[1])){if(lengthOfA >= args[1] ){inter = args[1]} else{inter = args[1]}}
		var i;
		message.channel.send('**'+"All the anime that release a new episode on Wednesday, for this season, are listed below: " + '**');
		for(i = 0; i < inter; i++){
			const lengthOfG = mondayinfo[i].genres.length;
			var j;
			season_genre = '';
			for(j=0; j< lengthOfG; j++){
				season_genre = season_genre + mondayinfo[i].genres[j].name + ', ';
			}
			if(lengthOfG == 0 ){
				season_genre = null;
			}
			try{
			var airdate = mondayinfo[i].airing_start;
            var pos = airdate.indexOf('T');
            var air_date;
			if(pos == -1){
				air_date = null;
			}
            air_date = airdate.slice(0,pos);
			const embed = new Discord.MessageEmbed()
            	.setColor('RANDOM')
				.setTitle(mondayinfo[i].title)
				.setURL(mondayinfo[i].url)
				.setThumbnail(mondayinfo[i].image_url)
				.addField('Summary', trim(mondayinfo[i].synopsis, 1024))
				.addField('Genres', season_genre)
				.addField('Episodes', mondayinfo[i].episodes)
				.addField('Type', mondayinfo[i].type)
				.addField('Start Date', air_date)
				.setTimestamp()
				.setFooter('SxStim Bot');

				message.channel.send(embed);
			}catch (error) {
				const embed = new Discord.MessageEmbed()
            	.setColor('RANDOM')
				.setTitle(mondayinfo[i].title)
				.setURL(mondayinfo[i].url)
				.setThumbnail(mondayinfo[i].image_url)
				.addField('Genres', season_genre)
				.addField('Episodes', mondayinfo[i].episodes)
				.addField('Type', mondayinfo[i].type)
				.addField('Start Date', air_date)
				.setTimestamp()
				.setFooter('SxStim Bot');

				message.channel.send(embed);
			}
		}

		}
		if (args[0].toLowerCase() == 'thursday') {
			const query = 'https://api.jikan.moe/v3/schedule/thursday';

		const mondayinfo  = await fetch(query).then(response => response.json()).then(json => json.thursday);
		if (mondayinfo == null) {
			return message.channel.send(`No results found for **${args.join(' ')}**.`);
        }
        const lengthOfA = mondayinfo.length;
		let inter = 0;
		if(lengthOfA >= 10){inter = 10}
		else{inter = lengthOfA}
		if (!isNaN(args[1])){if(lengthOfA >= args[1] ){inter = args[1]} else{inter = args[1]}}
		var i;
		message.channel.send('**'+"All the anime that release a new episode on Thursday, for this season, are listed below: " + '**');
		for(i = 0; i < inter; i++){
			const lengthOfG = mondayinfo[i].genres.length;
			var j;
			season_genre = '';
			for(j=0; j< lengthOfG; j++){
				season_genre = season_genre + mondayinfo[i].genres[j].name + ', ';
			}
			if(lengthOfG == 0 ){
				season_genre = null;
			}
			try{
			var airdate = mondayinfo[i].airing_start;
            var pos = airdate.indexOf('T');
			var air_date;
			if(pos == -1){
				air_date = null;
			}
            air_date = airdate.slice(0,pos);
			const embed = new Discord.MessageEmbed()
            	.setColor('RANDOM')
				.setTitle(mondayinfo[i].title)
				.setURL(mondayinfo[i].url)
				.setThumbnail(mondayinfo[i].image_url)
				.addField('Summary', trim(mondayinfo[i].synopsis, 1024))
				.addField('Genres', season_genre)
				.addField('Episodes', mondayinfo[i].episodes)
				.addField('Type', mondayinfo[i].type)
				.addField('Start Date', air_date)
				.setTimestamp()
				.setFooter('SxStim Bot');

				message.channel.send(embed);
			}catch (error) {
				const embed = new Discord.MessageEmbed()
            	.setColor('RANDOM')
				.setTitle(mondayinfo[i].title)
				.setURL(mondayinfo[i].url)
				.setThumbnail(mondayinfo[i].image_url)
				.addField('Genres', season_genre)
				.addField('Episodes', mondayinfo[i].episodes)
				.addField('Type', mondayinfo[i].type)
				.addField('Start Date', air_date)
				.setTimestamp()
				.setFooter('SxStim Bot');

				message.channel.send(embed);
			}
		}

		}
		if (args[0].toLowerCase() == 'friday') {
			const query = 'https://api.jikan.moe/v3/schedule/friday';

		const mondayinfo  = await fetch(query).then(response => response.json()).then(json => json.friday);
		if (mondayinfo == null) {
			return message.channel.send(`No results found for **${args.join(' ')}**.`);
        }
        const lengthOfA = mondayinfo.length;
		let inter = 0;
		if(lengthOfA >= 10){inter = 10}
		else{inter = lengthOfA}
		if (!isNaN(args[1])){if(lengthOfA >= args[1] ){inter = args[1]} else{inter = args[1]}}
		var i;
		message.channel.send('**'+"All the anime that release a new episode on Friday, for this season, are listed below: " + '**');
		for(i = 0; i < inter; i++){
			const lengthOfG = mondayinfo[i].genres.length;
			var j;
			season_genre = '';
			for(j=0; j< lengthOfG; j++){
				season_genre = season_genre + mondayinfo[i].genres[j].name + ', ';
			}
			if(lengthOfG == 0 ){
				season_genre = null;
			}
			try{
			var airdate = mondayinfo[i].airing_start;
            var pos = airdate.indexOf('T');
            var air_date;
			if(pos == -1){
				air_date = null;
			}
            air_date = airdate.slice(0,pos);
			const embed = new Discord.MessageEmbed()
            	.setColor('RANDOM')
				.setTitle(mondayinfo[i].title)
				.setURL(mondayinfo[i].url)
				.setThumbnail(mondayinfo[i].image_url)
				.addField('Summary', trim(mondayinfo[i].synopsis, 1024))
				.addField('Genres', season_genre)
				.addField('Episodes', mondayinfo[i].episodes)
				.addField('Type', mondayinfo[i].type)
				.addField('Start Date', air_date)
				.setTimestamp()
				.setFooter('SxStim Bot');

				message.channel.send(embed);
			}catch (error) {
				const embed = new Discord.MessageEmbed()
            	.setColor('RANDOM')
				.setTitle(mondayinfo[i].title)
				.setURL(mondayinfo[i].url)
				.setThumbnail(mondayinfo[i].image_url)
				.addField('Genres', season_genre)
				.addField('Episodes', mondayinfo[i].episodes)
				.addField('Type', mondayinfo[i].type)
				.addField('Start Date', air_date)
				.setTimestamp()
				.setFooter('SxStim Bot');

				message.channel.send(embed);
			}
		}

		}
		if (args[0].toLowerCase() == 'saturday') {
			const query = 'https://api.jikan.moe/v3/schedule/saturday';

		const mondayinfo  = await fetch(query).then(response => response.json()).then(json => json.saturday);
		if (mondayinfo == null) {
			return message.channel.send(`No results found for **${args.join(' ')}**.`);
        }
        const lengthOfA = mondayinfo.length;
		let inter = 0;
		if(lengthOfA >= 10){inter = 10}
		else{inter = lengthOfA}
		if (!isNaN(args[1])){if(lengthOfA >= args[1] ){inter = args[1]} else{inter = args[1]}}
		var i;
		message.channel.send('**'+"All the anime that release a new episode on Saturday, for this season, are listed below: " + '**');
		for(i = 0; i < inter; i++){
			const lengthOfG = mondayinfo[i].genres.length;
			var j;
			season_genre = '';
			for(j=0; j< lengthOfG; j++){
				season_genre = season_genre + mondayinfo[i].genres[j].name + ', ';
			}
			if(lengthOfG == 0 ){
				season_genre = null;
			}
			try{
			var airdate = mondayinfo[i].airing_start;
            var pos = airdate.indexOf('T');
            var air_date;
			if(pos == -1){
				air_date = null;
			}
            air_date = airdate.slice(0,pos);
			const embed = new Discord.MessageEmbed()
            	.setColor('RANDOM')
				.setTitle(mondayinfo[i].title)
				.setURL(mondayinfo[i].url)
				.setThumbnail(mondayinfo[i].image_url)
				.addField('Summary', trim(mondayinfo[i].synopsis, 1024))
				.addField('Genres', season_genre)
				.addField('Episodes', mondayinfo[i].episodes)
				.addField('Type', mondayinfo[i].type)
				.addField('Start Date', air_date)
				.setTimestamp()
				.setFooter('SxStim Bot');

				message.channel.send(embed);
			}catch (error) {
				const embed = new Discord.MessageEmbed()
            	.setColor('RANDOM')
				.setTitle(mondayinfo[i].title)
				.setURL(mondayinfo[i].url)
				.setThumbnail(mondayinfo[i].image_url)
				.addField('Genres', season_genre)
				.addField('Episodes', mondayinfo[i].episodes)
				.addField('Type', mondayinfo[i].type)
				.addField('Start Date', air_date)
				.setTimestamp()
				.setFooter('SxStim Bot');

				message.channel.send(embed);
			}
		}

		}
		if (args[0].toLowerCase() == 'sunday') {
			const query = 'https://api.jikan.moe/v3/schedule/sunday';

		const mondayinfo  = await fetch(query).then(response => response.json()).then(json => json.sunday);
		if (mondayinfo == null) {
			return message.channel.send(`No results found for **${args.join(' ')}**.`);
        }
        const lengthOfA = mondayinfo.length;
		let inter = 0;
		if(lengthOfA >= 10){inter = 10}
		else{inter = lengthOfA}
		if (!isNaN(args[1])){if(lengthOfA >= args[1] ){inter = args[1]} else{inter = args[1]}}
		var i;
		message.channel.send('**'+"All the anime that release a new episode on Sunday, for this season, are listed below: " + '**');
		for(i = 0; i < inter; i++){
			const lengthOfG = mondayinfo[i].genres.length;
			var j;
			season_genre = '';
			for(j=0; j< lengthOfG; j++){
				season_genre = season_genre + mondayinfo[i].genres[j].name + ', ';
			}
			if(lengthOfG == 0 ){
				season_genre = null;
			}
			try{
			var airdate = mondayinfo[i].airing_start;
            var pos = airdate.indexOf('T');
            var air_date;
			if(pos == -1){
				air_date = null;
			}
            air_date = airdate.slice(0,pos);
			const embed = new Discord.MessageEmbed()
            	.setColor('RANDOM')
				.setTitle(mondayinfo[i].title)
				.setURL(mondayinfo[i].url)
				.setThumbnail(mondayinfo[i].image_url)
				.addField('Summary', trim(mondayinfo[i].synopsis, 1024))
				.addField('Genres', season_genre)
				.addField('Episodes', mondayinfo[i].episodes)
				.addField('Type', mondayinfo[i].type)
				.addField('Start Date', air_date)
				.setTimestamp()
				.setFooter('SxStim Bot');

				message.channel.send(embed);
			}catch (error) {
				const embed = new Discord.MessageEmbed()
            	.setColor('RANDOM')
				.setTitle(mondayinfo[i].title)
				.setURL(mondayinfo[i].url)
				.setThumbnail(mondayinfo[i].image_url)
				.addField('Genres', season_genre)
				.addField('Episodes', mondayinfo[i].episodes)
				.addField('Type', mondayinfo[i].type)
				.addField('Start Date', air_date)
				.setTimestamp()
				.setFooter('SxStim Bot');

				message.channel.send(embed);
			}
		}

		}
		
		
	},
};
