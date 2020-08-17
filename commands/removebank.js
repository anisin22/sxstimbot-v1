const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fetch = require('node-fetch');
const querystring = require('querystring');
const { admin } = require('firebase-admin');
let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
    name: 'removebank',
    description: `Use this command to remove an item from the bank., only Officers+ can use this.`,
    aliases: ['rgbank','rb'],
    usage: '<item>',
    args: true,
	async execute(message, args, db) {
        if (!(message.member.hasPermission('VIEW_AUDIT_LOG'))) {
            return message.channel.send("You dont have permission to use this command")
        }
        if(!isNaN(args[0])){
            return message.channel.send('Please make sure you follow the format ``<item>``');
        }
        
            let item = args[0];
            db.collection('guildBank').doc(message.guild.id).update({
                [`bank.${item}`] : FieldValue.delete()
                  
            }).then(() => {
                message.channel.send(`${item} has been removed from bank`);
            });
        
            
        
	},
};