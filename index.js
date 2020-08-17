const fs = require('fs');
const Discord = require('discord.js');
const {token, dog_api_key, DOG_API_URL} = require('./config.json');
const client = new Discord.Client();
var cron = require("cron");
const r2 = require('r2');
var schedule = require('node-schedule');
client.commands = new Discord.Collection();
const fetch = require('node-fetch');
const querystring = require('querystring');
require('dotenv/config');
let prefix = '+';


const FieldValue = require('firebase-admin').firestore.FieldValue;
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
})

let db = admin.firestore();

client.on('ready', () => {

let date = new Date();
console.log('\x1b[36m%s\x1b[0m', `SxStim Bot has started on ${date}. Active on ${client.guilds.cache.size} servers. Watching Over ${client.users.cache.size} Users.`);	


// Change Bot status every 30 seconds
const statuses = [{
	"Type": "PLAYING",
	"Game": "Realm Of the Mad God"
},
{
	"Type": "WATCHING",
	"Game": "Anime with Guildies"
},
{
	"Type": "WATCHING",
	"Game": "Movies with Guildies"
},
{
	"Type": "WATCHING",
	"Game": `Over, ${client.users.cache.size} Users!` 
},
{
	"Type": "WATCHING",
	"Game": `Over ${client.guilds.cache.size} Server(s)!` 
},
{
	"Type": "WATCHING",
	"Game": "The ROTMG Anime"
},
{
	"Type": "WATCHING",
	"Game": `${prefix}help For Commands`,
},
{
	"Type": "PLAYING",
	"Game": "With a Shiba"
},
];


setInterval(() => {
	var status = statuses[Math.floor(Math.random()*statuses.length)];
	
		client.user.setActivity(status["Game"],{type: status["Type"]});
}, 30000);

});
//Initalizes a database everytime it joins a new server
client.on('guildCreate', async gData =>{
	db.collection('guilds').doc(gData.id).set({
		'guildID' : gData.id,
		'guildName' : gData.name,
		'guildOwner' : gData.owner.user.username,
		'guildOwnerID' : gData.owner.id,
		'guildMemberCount' : gData.memberCount,
		'prefix' : '+',
	});
	db.collection('verify').doc(gData.id).set({
		'realmeye' : [],
		'VipBoi' : [],
	});
	db.collection('guildBank').doc(gData.id).set({
		'bank' : {},
		'CreditScore' : {},
	});
});

function msToTime(ms){
	days = Math.floor(ms / 86400000); // 24*60*60*1000
	daysms = ms % 86400000; // 24*60*60*1000
	hours = Math.floor(daysms / 3600000); // 60*60*1000
	hoursms = ms % 3600000; // 60*60*1000
	minutes = Math.floor(hoursms / 60000); // 60*1000
	minutesms = ms % 60000; // 60*1000
	sec = Math.floor(minutesms / 1000);
  
	let str = "";
	if (days) str = str + days + "d";
	if (hours) str = str + hours + "h";
	if (minutes) str = str + minutes + "m";
	if (sec) str = str + sec + "s";
  
	return str;
  }
//Whenever someone joins it sends a message to #welcome-goodbye, you need a channel called this for this to work, you can change this for your own server.
  client.on("guildMemberAdd", member => {
	const channel = member.guild.channels.cache.find(c => c.name === "welcome-goodbye");
	if (!channel) return;
	const heart = client.emojis.cache.find(c => c.name === "PeepoHeart");
	var out = heart.toString();
	channel.send(`${member}`).then(m => {
	const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
			.setTitle('Welcome Kommerad!')
            .setDescription(`Welcome to SxStim,${member}. If you want to join make sure to read <#603483532504858644> and head over to <#701806778953891860> and follow the intructions to join. Hope to see you around ${out}`)
            .setTimestamp()
			.setFooter('SxStim Bot')
		
		m.edit('',embed);
	})
	
  });
//Whenever someone leaves
  client.on("guildMemberRemove", member => {
	const channel = member.guild.channels.cache.find(c => c.name === "welcome-goodbye"); 
	if (!channel) return;
	const heart = client.emojis.cache.find(c => c.name === "pepe_cri");
	var out = heart.toString();
	const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
			.setTitle('Kommerad has defected to the enemy side!')
            .setDescription(`You will be missed, ${member}. ${out}`)
            .setTimestamp()
			.setFooter('SxStim Bot')
	channel.send(embed);
  });
//load shiba pic
  async function loadImage(){
			
	var headers = {
		'X-API-KEY': dog_api_key,
	}
	try {
	  let _url = DOG_API_URL;
	  var response = await r2.get(_url , {headers} ).json
	} catch (e) {
		console.log(e)
	}
	return response;
  }

client.on('message', async message => {
	
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	let shibacounter = 0;
	//send shiba picture twice a day
	let sheduledMessage = schedule.scheduleJob('00 30 10,17 * * *', async () => {
		if(shibacounter % 7 == 0){
		var images = await loadImage();
		var image = images[0];
		var breed = image.breeds[0];
		const embed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle('Daily Dose of Doggo!!')
			.setURL(image.url)
			.setImage(image.url)
			.setTimestamp();
		const channel = message.guild.channels.cache.find(c => c.name === "shiba-inu");
		if (!channel){
			return;
		};
		channel.send(embed);
	}
	else if(shibacounter % 7 != 0){
		return shibacounter++;
	}
});

//update totals for the guild bank
let weeklyscoreReset = schedule.scheduleJob('00 00 12 * * 1', async () => {
	var keys = []
	db.collection('guildBank').doc(message.guild.id).get().then((r) => {
		for(var x in r.data().CreditScore){
			keys.push(x)    
		}
		const obj = r.get('CreditScore');
		for(var i = 0; i < keys.length; i++){
			const f = obj[`${keys[i]}`];
			let potionweekly = f[2];
			let equipweekly = f[3];
			let oldtotal = f[0];
			let newtotal;
			if(oldtotal >= 0){
				newtotal = potionweekly + equipweekly;
				
			}
			if(oldtotal < 0){
				newtotal = oldtotal + potionweekly + equipweekly;
				if(newtotal < 0){
					potionweekly = 0;
					equipweekly = 0;
				}
			}
			if(potionweekly < 0){
				potionweekly = 0;
			}
			if(equipweekly < 0){
				equipweekly = 0;
			}
			let debtlvl = 0;
			if(newtotal <= -48){
				debtlvl = 1
			}
			if(newtotal <= -60){
				debtlvl = 2
			}
			if(newtotal <= -66){
				debtlvl = 3
			}
		db.collection('guildBank').doc(message.guild.id).update({
			[`CreditScore.${keys[i]}`] : [newtotal, debtlvl, potionweekly, equipweekly] 
		})
	}
	})
});
	if (command ==='ping') {
		
		message.channel.send("〽️ Pinging").then(m => {
			const L = `${m.createdTimestamp - message.createdTimestamp}ms`;
			const Al = `${Math.round(client.ws.ping)}ms`;
			const uptime = `${msToTime(client.uptime)}`
			const pEmbed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle('📶 Ping')
			.addField("Server", "```"+ L +" ```")
			.addField("API Latency", "```"+ Al +" ```", true)
			.addField("Uptime", "```"+ uptime +" ```", true)
			.setFooter('SxStim Bot')
			.setTimestamp();
			m.edit('',pEmbed);
		})
	}
	
});


//command handler with help command
client.login(token);

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', message => {

	
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;
    
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
    }

	try {
		command.execute(message, args, db);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
	

	
});