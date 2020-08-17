const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fetch = require('node-fetch');
const querystring = require('querystring');
const trim = (str, max) => str.length > max ? `${str.slice(0, max - 3)}...` : str;

module.exports = {
    name: 'trace',
	description: 'general image search',
	aliases: ['sauce'],
	usage: '<url of image from an anime>',
    args: true,
	async execute(message, args) {
		
        const pic = args[0];
		const query = 'https://saucenao.com/search.php?db=999&output_type=2&numres=1&url=' + pic;
		let anime = await fetch(query).then(r => r.json()).then(json => json.results);

		var tableset = [];
            
        
        if(anime[0].data.source != null){
			var table = {name: `Source:`, value: `${anime[0].data.source}`};
        tableset.push(table);
		}   
        if(anime[0].data.material != null){
			var table = {name: `Material:`, value: `${anime[0].data.material}`};
        tableset.push(table);
		}     
		if(anime[0].data.eng_name != null){
			var table = {name: `Name:`, value: `${anime[0].data.eng_name}`};
        tableset.push(table);
		}
		if(anime[0].data.eng_name != null){
			var table = {name: `Name:`, value: `${anime[0].data.eng_name}`};
        tableset.push(table);
		}
		if(anime[0].data.title != null){
			var table = {name: `Title:`, value: `${anime[0].data.title}`};
        tableset.push(table);
		}
		if(anime[0].data.source != null){
			var table = {name: `Source:`, value: `${anime[0].data.source}`};
        tableset.push(table);
		}
		try{	
		const embed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle(`Trace Results:`)
		.addFields(tableset)
		.setThumbnail(anime[0].header.thumbnail)
		.addField('Similarity', `${anime[0].header.similarity}%`)
		.addField('Extra Info', anime[0].data.ext_urls)
		.setTimestamp()
		.setFooter('This is still in beta, it is not 100% correct. Sorry in advance!');

		message.channel.send(embed);
		}catch (error) {
			message.channel.send("Either you sent a bad link,I could not find it or discord is rate limiting me :(");
		}
	},
};