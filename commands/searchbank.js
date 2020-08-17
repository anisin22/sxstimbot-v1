const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fetch = require('node-fetch');
const querystring = require('querystring');
let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
    name: 'searchbank',
    description: `Use this command to search a specific item from the Bank.`,
    aliases: ['sgbank', 'sb'],
    usage: '<item>',
    args: true,
	async execute(message, args, db) {

        let item = args[0];
        let itemstr = String(item);
        db.collection('guildBank').doc(message.guild.id).get().then((r) => {
            const obj = r.get('bank');
            let f = obj[`${itemstr}`]
            if(f == null){
                return message.channel.send(`**${item}** does not exist in the database`)
            }  
            const embed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle('Guild Bank Search Results:')
			.setDescription(`There are ${f} ${item}'s in the Guild Bank.\nPlease ping <@!184798960362323968> if you want one.`)
            .setTimestamp();

		    message.channel.send(embed);
            
        })
	},
};