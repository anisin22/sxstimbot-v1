const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fetch = require('node-fetch');
const querystring = require('querystring');
let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
    name: 'addbank',
    description: `Use this command to add items to the bank, only Officers+ can use this.`,
    aliases: ['agbank','ab'],
    usage: '<item> <+/-/=> <quantity>',
    args: true,
	async execute(message, args, db) {
        if (!(message.member.hasPermission('VIEW_AUDIT_LOG'))) {
            return message.channel.send("You dont have permission to use this command")
        }
        if(!isNaN(args[0])){
            return message.channel.send('Please make sure you follow the format ``<item> <+/-/=> <quantity>``');
        }
        if(args[1] == null){
            return message.channel.send('Please make sure you follow the format ``<item> <+/-/=> <quantity>``');
        }
        if(args[2] == null){
            return message.channel.send('Please make sure you follow the format ``<item> <+/-/=> <quantity>``');
        }
        if(args[1] === '='){
            if(isNaN(args[2])){
                return message.channel.send('Please make sure you follow the format ``<item> <+/-/=> <quantity>``');
            }
            let item = args[0];
            
            let value = parseInt(args[2]);
            let itemstr = 'bank.' + String(item);
            
    
            db.collection('guildBank').doc(message.guild.id).update({
                [`${itemstr}`] : value
            }).then(() => {
                message.channel.send(`Bank has been updated`);
            });
        }
        if(args[1] === '+'){
            if(isNaN(args[2])){
                return message.channel.send('Please make sure you follow the format ``<item> <+/-/=> <quantity>``');
            }
            let item = args[0];
            
            let value = parseInt(args[2]);
            let itemstr = String(item);
            db.collection('guildBank').doc(message.guild.id).get().then((r) => {
                const obj = r.get('bank');
                const oldVal = obj[itemstr];
                const newVal = oldVal + value;
                db.collection('guildBank').doc(message.guild.id).update({
                    [`bank.${item}`] : newVal
                }).then(() => {
                    message.channel.send(`Bank has been updated`);
                });
            })
        }
        if(args[1] === '-'){
            if(isNaN(args[2])){
                return message.channel.send('Please make sure you follow the format ``<item> <+/-/=> <quantity>``');
            }
            let item = args[0];
            
            let value = parseInt(args[2]);
            let itemstr = String(item);
            db.collection('guildBank').doc(message.guild.id).get().then((r) => {
                const obj = r.get('bank');
                const oldVal = obj[itemstr];
                const newVal = oldVal - value;
                db.collection('guildBank').doc(message.guild.id).update({
                    [`bank.${item}`] : newVal
                }).then(() => {
                    message.channel.send(`Bank has been updated`);
                });
            })
        }
        
        
	},
};