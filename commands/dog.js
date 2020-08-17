const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fetch = require('node-fetch');
const querystring = require('querystring');

module.exports = {
    name: 'dog',
    aliases: ['doggo'],
    description: 'Send embeded shiba picture',
    
	async execute(message, args) {
        let dog = await fetch("https://dog.ceo/api/breed/shiba/images/random").then(r => r.json()).then(json => json.message);
		const embed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle('Doggo!!')
			.setURL(dog)
			.setImage(dog)
            .setTimestamp();

		message.channel.send(embed);
	},
};