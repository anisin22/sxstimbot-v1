const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fetch = require('node-fetch');
const querystring = require('querystring');
let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
    name: 'join',
    description: `Use this command to join SxStim. Need a channel called "waiting" for this to work.`,
    aliases: ['verify','jguild'],
	usage: '<RoTMG IGN>',
    args: true,
	async execute(message, args, db) {
            const realm = 'https://www.realmeye.com/player/'
            const verify_name = args[0];
            const full = realm + verify_name;
            let joinMessage = `${message.author} wants to join the guild. Their realmeye is ${full}`
            if(message.member.roles.cache.find(r => r.name === 'VIP boi')){
                db.collection('verify').doc(message.guild.id).update({
                    'VipBoi' : FieldValue.arrayUnion(joinMessage)
                }).then(() => {
                    return message.channel.send(`${message.author} has been added to the VIP waiting list`);
                });
                return;
            }
            
            let meetsReqs = true;
            try{
            const query = 'https://nightfirec.at/realmeye-api/?player=' + verify_name;
            let realmeye = await fetch(query).then(r => r.json());
		    let two = false;
		    for(let i = 0; i< realmeye.characters.length; i++){
			    if(realmeye.characters[i].stats_maxed >= 2){
				    two = true;
				    break;
			    }
		    }
            if(realmeye.fame < 2000){
                meetsReqs = false
            }
            if(two == false){
                meetsReqs = false
            }
        }catch (error) {
            return message.channel.send('Either your profile is private on Realmeye or you misspelled your IGN. Please make sure to unprivate your realmeye and check the spelling again.');
        }
        if(meetsReqs == true){
            db.collection('verify').doc(message.guild.id).update({
                'realmeye' : FieldValue.arrayUnion(joinMessage)
            }).then(() => {
                message.channel.send(`${message.author} has been added to the waiting list`);
            });
            try{
                if(message.author.username.toLowerCase() === verify_name.toLowerCase()){
                    return;
                }
                message.guild.members.cache.get(message.author.id).setNickname(`${message.author.username} | ${verify_name}`);
                }catch (error) {
                    console.error(error);
                }
            }
            else if(meetsReqs == false){
                return message.channel.send('You do not meet the reqs they are ' + '``2K Total Live fame`` and at least ``one 2/8 character``. Please apply once you meet them.');
            }
	},
};