const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fetch = require('node-fetch');
const querystring = require('querystring');
let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
    name: 'searchScore',
    description: `Use this command to search a specific item from the Bank.`,
    aliases: ['ss'],
    usage: '<@person>',
    args: true,
	async execute(message, args, db) {
        if (!(message.member.roles.cache.find(r => r.name === 'Member'))) {
            return message.channel.send("You dont have permission to use this command")
        }
        let item = message.mentions.users.first();
        
        db.collection('guildBank').doc(message.guild.id).get().then((r) => {
            const obj = r.get('CreditScore');
            let f = obj[`<@${item.id}>`]
            if(f == null){
                return message.channel.send(`${item} is not in the database`)
            }  
            const embed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle('Credit Score Search Results:')
            .setDescription(`${item}\n\nTotal: ${f[0]}\nTotal Potion Score: ${f[2]}\nTotal Equipment Score: ${f[3]}\nDebt Level: ${f[1]}`)
            .setTimestamp();

		    message.channel.send(embed);
            
        })
	},
};