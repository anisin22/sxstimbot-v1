const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fetch = require('node-fetch');
const querystring = require('querystring');
let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
    name: 'viewCreditScores',
    description: `Use this command to see all the members credit scores`,
    aliases: ['vs'],
	async execute(message, args, db) {
        if (!(message.member.hasPermission('VIEW_AUDIT_LOG'))) {
            return message.channel.send("You dont have permission to use this command")
        }
        var keys = []
        var keyvalue = []
        db.collection('guildBank').doc(message.guild.id).get().then((r) => {
            
            for(var x in r.data().CreditScore){
                keys.push(x)
                
            }
            
            for(var i = 0; i<keys.length; i++){
                var f = String(keys[i]);
                keyvalue.push(r.data().CreditScore[f]);
                
            }
            
            var tableset = [];
            for(var j = 0; j < keys.length; j++){
                var table = {name: '\u200b', value:  keys[j] +`\nTotal Points: ${keyvalue[j][0]}\nPotion Score: ${keyvalue[j][2]}\nEquipment Score: ${keyvalue[j][3]}\nDebt Level: ${keyvalue[j][1]}\n`};            
                tableset.push(table);
                
            }
            const embed = new Discord.MessageEmbed()
			.setColor('RANDOM')
            .setTitle('Member score Overview:')
            .addFields(tableset)
            
            message.channel.send(embed);
            
        })
	},
};