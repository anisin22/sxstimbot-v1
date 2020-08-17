const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fetch = require('node-fetch');
const querystring = require('querystring');
let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
    name: 'viewbank',
    description: `Use this command to see SxStim's guild bank`,
    aliases: ['vgbank','vb'],
	async execute(message, args, db) {
        
        var keys = []
        var keyvalue = []
        db.collection('guildBank').doc(message.guild.id).get().then((r) => {
            
            for(var x in r.data().bank){
                keys.push(x)
                
            }
            keys.sort();
            for(var i = 0; i<keys.length; i++){
                var f = String(keys[i]);
                keyvalue.push(r.data().bank[f]);
                
            }
            
            var tableset = [];
            for(var j = 0; j < keys.length; j++){
                var table = {name: `${keys[j]}:`, value: '```' + keyvalue[j] + '```'};
                tableset.push(table);
                
            }
            const embed = new Discord.MessageEmbed()
			.setColor('RANDOM')
            .setTitle('Guild Bank Overview:')
            .addFields(tableset)
            
            message.channel.send(embed);
            
        })
	},
};