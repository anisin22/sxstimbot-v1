const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fetch = require('node-fetch');
const querystring = require('querystring');
const { admin } = require('firebase-admin');
let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
    name: 'removeScore',
    description: `Use this command to remove a member's Credit Score., only Officers+ can use this.`,
    aliases: ['rs'],
    usage: '<@person>',
    args: true,
	async execute(message, args, db) {
        if (!(message.member.hasPermission('VIEW_AUDIT_LOG'))) {
            return message.channel.send("You dont have permission to use this command")
        }
        
        
        let item = message.mentions.users.first();
            db.collection('guildBank').doc(message.guild.id).update({
                [`CreditScore.<@${item.id}>`] : FieldValue.delete()
                  
            }).then(() => {
                message.channel.send(`Stopped tracking ${item} Credit Score`);
            });
        
            
        
	},
};