const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fetch = require('node-fetch');
const querystring = require('querystring');
let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
    name: 'joinBank',
    description: `Use this command to join the guild bank`,
    aliases: ['jgbank','jb'],
	async execute(message, args, db) {
        if (!(message.member.roles.cache.find(r => r.name === 'Member'))) {
            return message.channel.send("You dont have permission to use this command")
        }
        
            //[0,0,0,0] = 
            //[total contribution score, 0
            //debt level, 1
            //weekly potion contribution, 2
            //weekly equipment contribution, 3]
            db.collection('guildBank').doc(message.guild.id).update({
                [`CreditScore.${message.author}`] : [0,0,0,0]
            }).then(() => {
                message.channel.send(`You have been added, your score will be kept track of now.`);
            });
	},
};