const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fetch = require('node-fetch');
const querystring = require('querystring');
const trim = (str, max) => str.length > max ? `${str.slice(0, max - 3)}...` : str;
function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
  }

module.exports = {
    name: 'waffleswuf',
    description: 'Sends pics of waffles and shiba together',
    aliases: ['waffles', 'waffle'],
	async execute(message, args) {
        doggo_pics = ['https://i.pinimg.com/originals/73/b8/7c/73b87cce98529654cf10276dcaa8fa51.jpg','https://img.particlenews.com/image.php?type=thumbnail_1024x576&url=1gwkOT_0OBEz3XP00', 'https://i.pinimg.com/originals/06/8d/b3/068db391df488c09d6637b1ca64c529b.jpg'];
		randomInt = getRandomInt(3);
        message.channel.send(doggo_pics[randomInt]);
    },
};
