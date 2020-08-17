const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fetch = require('node-fetch');
const querystring = require('querystring');
let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
    name: 'deposit',
    description: `Use this command to deposit to the guild bank`,
    aliases: ['d'],
    usage: '<p/e> <points>',
    args: true,
	async execute(message, args, db) {
        if (!(message.member.roles.cache.find(r => r.name === 'Member'))) {
            return message.channel.send("You dont have permission to use this command")
        } 
            let item = parseInt(args[1]);
            
            const channel = message.guild.channels.cache.find(c => c.name === "ping-demo");
            const logchannel = message.guild.channels.cache.find(c => c.name === "bank-log");
            if (!channel){
                return message.channel.send("There is no #ping-demo channel in this server")
            };
            if(args[0] == 'p'){
                db.collection('guildBank').doc(message.guild.id).get().then((r) => {
                    const obj = r.get('CreditScore');
                    if(obj[`${message.author}`] == null){
                        return message.channel.send('Could not find you in the bank')
                    }
                    
                    const f = obj[`${message.author}`];
                    if(!(isNaN(args[1]))){
                    const oldVal = parseInt(f[2]);  
                    const newVal = oldVal + item;
                    
                    db.collection('guildBank').doc(message.guild.id).update({
                        [`CreditScore.${message.author}`] : [f[0], f[1], newVal, f[3]]
                          
                    }).then(() => {
                        message.channel.send('Demo has been pinged and he will be in touch shortly.');
                        logchannel.send(`${message.author} has deposited ${item} potion points`);
                        channel.send(`<@184798960362323968>, ${message.author} needs to deposit some potions to the guild bank. Please get to him whenever possible.`);
                    });
                }
                })
            }
            if(args[0] == 'e'){
                db.collection('guildBank').doc(message.guild.id).get().then((r) => {
                    const obj = r.get('CreditScore');
                    if(obj[`${message.author}`] == null){
                        return message.channel.send('Could not find you in the bank')
                    }
                    
                    const f = obj[`${message.author}`];
                    if(!(isNaN(args[1]))){
                    const oldVal = parseInt(f[3]);  
                    const newVal = oldVal + item;
                    
                    db.collection('guildBank').doc(message.guild.id).update({
                        [`CreditScore.${message.author}`] : [f[0], f[1], f[2], newVal]
                          
                    }).then(() => {
                        message.channel.send('Demo has been pinged and he will be in touch shortly.');
                        logchannel.send(`${message.author} has deposited ${item} equipment points`);
                        channel.send(`<@184798960362323968>, ${message.author} needs to deposit some tops/abilities to the guild bank. Please get to him whenever possible.`);
                    });
                }
                })
            }
            
	},
};
