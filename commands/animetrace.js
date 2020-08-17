const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fetch = require('node-fetch');
const querystring = require('querystring');
const trim = (str, max) => str.length > max ? `${str.slice(0, max - 3)}...` : str;

module.exports = {
    name: 'animetrace',
	description: 'Lets you search and find what scene the picture is from the anime',
	aliases: ['animesauce'],
	usage: '<url of image from an anime>',
    args: true,
	async execute(message, args) {
		
        const pic = args[0];
		const query = 'https://trace.moe/api/search?url=' + pic;
		let anime = await fetch(query).then(r => r.json()).then(json => json.docs);
		try{
		let animeID = anime[0].mal_id;
		let animeinfo = await fetch(`https://api.jikan.moe/v3/anime/${animeID}`).then(r => r.json());
		const lengthOfG = animeinfo.genres.length;
			var j;
			season_genre = '';
			for(j=0; j< lengthOfG; j++){
				season_genre = season_genre + animeinfo.genres[j].name + ', ';
			}
			if(lengthOfG == 0 ){
				season_genre = null;
			}
			
		const embed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle(animeinfo.title)
		.setURL(animeinfo.url)
		.setThumbnail(animeinfo.image_url)
		.addField('Summary', trim(animeinfo.synopsis, 1024))
		.addField('Genres', season_genre)
		.addField('Episodes', animeinfo.episodes)
		.addField('Duration of each Episode', animeinfo.duration)
		.addField('Type', animeinfo.type)
		.addField('Source', animeinfo.source)
		.addField('Aired', animeinfo.aired.string)
		.addField('Score and Rating', `${animeinfo.score}/10\n${animeinfo.rating}`)									
		.setDescription(`Most likely from episode ${anime[0].episode}.\n Chance of me being correct is ${Math.round(anime[0].similarity *100)}%`)
		.setTimestamp()
		.setFooter('This is still in beta, it is not 100% correct. Make sure to send pictures from anime only. Sorry in advance!');

		message.channel.send(embed);
		}catch (error) {
			message.channel.send("Either you sent a bad link,I could not find it or discord is rate limiting me :(");
		}
	},
};
