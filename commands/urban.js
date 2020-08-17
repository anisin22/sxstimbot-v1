const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fetch = require('node-fetch');
const querystring = require('querystring');
const trim = (str, max) => str.length > max ? `${str.slice(0, max - 3)}...` : str;
module.exports = {
    name: 'urban',
    description: 'Send the first definition from the urban dictionary of a word',
    aliases: ['urbandict'],
	usage: '<word you want to search>',
    args: true,
	async execute(message, args) {
        const query = querystring.stringify({ term: args.join(' ') });

    const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());

    if (!list.length) {
        return message.channel.send(`No results found for **${args.join(' ')}**.`);
    }
    const lengthOf = list.length

    
    
    
    const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(list[0].word)
        .setURL(list[0].permalink)
        .addField('Definition', trim(list[0].definition, 1024))
        .addField('Example', trim(list[0].example, 1024))
        .setTimestamp()
        .addField('Rating', `${list[0].thumbs_up} thumbs up. ${list[0].thumbs_down} thumbs down.`);

    message.channel.send(embed);
	},
};




