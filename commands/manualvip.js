const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fetch = require('node-fetch');
const querystring = require('querystring');
let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
    name: 'manualvip',
    description: `Use this command to manually add someone to the database. Only Officers+ can use it.`,
    aliases: ['mv'],
	usage: '<@discordname> <RoTMG IGN>',
    args: true,
	async execute(message, args, db) {
        if (!(message.member.hasPermission('VIEW_AUDIT_LOG'))) {
            return message.channel.send("You dont have permission to use this command")
        }
        if(args[1] == null){
            return message.channel.send("Please use the format +mj <@discordname> <RoTMG IGN>.");
        }
        if(!(isNaN(args[1]))){
            return message.channel.send("Please use the format +mj <@discordname> <RoTMG IGN>.");
        }
            const realm = 'https://www.realmeye.com/player/'
            const verify_name = args[1];
            const disordTag = args[0];
            const full = realm + verify_name;
            let joinMessage = `${disordTag} wants to join the guild. Their realmeye is ${full}`
            
           
        
            db.collection('verify').doc(message.guild.id).update({
                'VipBoi' : FieldValue.arrayUnion(joinMessage)
            }).then(() => {
                message.channel.send(`${disordTag} has been added to the VIP waiting list`);
            });
            
            
            
	},
};