const { MessageFlags } = require("discord.js");

module.exports = {
    name: 'invite',
    aliases: ['invitelink'],
	description: 'Sends bots invite link',
	execute(message, args) {
		message.channel.send("https://discord.com/oauth2/authorize?client_id=730828019786186782&scope=bot&permissions=8")
	},
};