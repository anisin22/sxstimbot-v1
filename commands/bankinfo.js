const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fetch = require('node-fetch');
const querystring = require('querystring');
const { admin } = require('firebase-admin');
let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
    name: 'bankinfo',
    description: `Use this command to see how the Guild Bank works`,
    aliases: ['bgi', 'info'],
    
	async execute(message, args, db) {
        if (!(message.member.roles.cache.find(r => r.name === 'Member'))) {
            return message.channel.send("You dont have permission to use this command")
        }
            const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Guild Bank Info')
            .addField('Overview', `You start out with 0 contribution score if you are new to the guild bank. Depositing increases your weekly contribution score and withdrawing decreases your weekly contribution score. You can withdraw a maximum of 24 points per week (-24 points from your score at the start of the week).`)
            .addField('Debt System', `The debt system occurs when your contribution score becomes too low. There are **3 levels of debt**, which occur at **-48**, **-60**, and **-66** overall points, respectively.\n
            **Level 1 Debt**\n reduces your minimum weekly score to **-12**\n
            **Level 2 Debt**\n reduces your minimum weekly score to **-6**\n
            **Level 3 Debt**\n reduces your minimum weekly score to **0**\n
            Once you hit 0 you will not be able to withdraw until you donate enough back.`)
            .addField('Potion Points Vs. Equipment Points', 'First Potion Points, you get these by donating potions to the guild bank, you can use them for both potions and equipment (it is a 1:1 ratio for equipment). For example if you want to withdraw a top it will cost you 6 Potion Points or 6 Equipment points.\n\nThe second points are the Equipment Points, you get these by donating various tops/abilities/tradable items, you can use them for both potions and equipment, however if you want to use equipment points for potions it will be **4x** your equipment points to withdraw potions.')
            .addField('Item Points:',`Rainbows: **1**\nMana: **2**\nLife: **3**\nTops: **6**\nT6 Abilities: **8**\nGlife: **9**\nGMana: **6**\nRainbow Greater pots: **2**\nTradable items not listed are worth their value in life **x3**\nIf you are using Equipment points to get potions **x4** their original value`)
            .addField('Limited Time Event', 'Withdrawing and Depositing Life is now **x2**')
            .setTimestamp()
            .setFooter('SxStim Bot')
            return message.channel.send(embed);
        
            
        
	},
};
