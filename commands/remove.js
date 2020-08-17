const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fetch = require('node-fetch');
const querystring = require('querystring');
let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
    name: 'remove',
    description: 'remove from waiting list',
    usage: '<Position> <Optional: VIP>',
    args: true,
	async execute(message, args, db) {
        
        if (!(message.member.hasPermission('VIEW_AUDIT_LOG'))) {
            return message.channel.send("You dont have permission to use this command")
        }
        if(args[0] < 1){
            return message.channel.send('Please enter a position that is greater than 0');
         }
           
            const verify_name = args[0] - 1;
            const channel = message.guild.channels.cache.find(c => c.name === "waiting");
            if (!channel){
                return message.channel.send("There is no #waiting channel in this server")
            };
        if(!(args[1] == null)){
        if(args[1].toLowerCase() == 'vip'){
            db.collection('verify').doc(message.guild.id).get().then((r) => {
                channel.bulkDelete(2, true).catch(err => {
                    console.error(err);
                    channel.send('there was an error trying to prune messages in this channel!');
                    });
                if(args[0] > r.data().VipBoi.length) {
                    return message.channel.send("That is not a valid position")
                }
                db.collection('verify').doc(message.guild.id).update({
                    'VipBoi' : FieldValue.arrayRemove(r.data().VipBoi[verify_name])
                }).then(() => {
                    message.channel.send(`Position ${verify_name +1} has been removed from the VIP waiting list`);
                });
                
            })
            return;
        }
    }

            db.collection('verify').doc(message.guild.id).get().then((r) => {
                channel.bulkDelete(2, true).catch(err => {
                    console.error(err);
                    channel.send('there was an error trying to prune messages in this channel!');
                    });
                if(args[0] > r.data().realmeye.length) {
                    return message.channel.send("That is not a valid position")
                }
                db.collection('verify').doc(message.guild.id).update({
                    'realmeye' : FieldValue.arrayRemove(r.data().realmeye[verify_name])
                }).then(() => {
                    message.channel.send(`Position ${verify_name +1} has been removed from the waiting list`);
                });
                
            })
        
           
        
	},
};