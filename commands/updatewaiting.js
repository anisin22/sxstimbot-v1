const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fetch = require('node-fetch');
const querystring = require('querystring');
let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
    name: 'updatewaiting',
    aliases: ['update','uw','uwu'],
    description: 'Update #waiting, deletes old waiting list and re-updates it',
	async execute(message, args, db) {
        
        if (!(message.member.hasPermission('VIEW_AUDIT_LOG'))) {
            return message.channel.send("You dont have permission to use this command")
        }
            const channel = message.guild.channels.cache.find(c => c.name === "waiting");
            if (!channel){
                return message.channel.send("There is no #waiting channel in this server")
            };
            
        db.collection('verify').doc(message.guild.id).get().then((r) => {
            channel.bulkDelete(2, true).catch(err => {
            console.error(err);
            channel.send('there was an error trying to prune messages in this channel!');
            });
            var tableset = [];
            for (var i = 0; i < r.data().realmeye.length; i++){
                var table = {name: `${i+1}`, value: `${r.data().realmeye[i]}`};
                tableset.push(table);
            }
            var tablesetN = [];
            for (var i = 0; i < r.data().VipBoi.length; i++){
                var tableN = {name: `${i+1}`, value: `${r.data().VipBoi[i]}`};
                tablesetN.push(tableN);
            }
            const embedN = new Discord.MessageEmbed()
			.setColor('RANDOM')
            .setTitle('VIP Waiting List:')
            .addFields(tablesetN)
            channel.send(embedN);

            const embed = new Discord.MessageEmbed()
			.setColor('RANDOM')
            .setTitle('Waiting List:')
            .addFields(tableset)
            channel.send(embed);
        })
            
        
	},
};

