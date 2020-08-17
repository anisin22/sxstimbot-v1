const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fetch = require('node-fetch');
const querystring = require('querystring');
const trim = (str, max) => str.length > max ? `${str.slice(0, max - 3)}...` : str;

module.exports = {
    name: 'movie',
    description: 'Lets you search and watch movies',
    aliases: ['moviesearch'],
	usage: '<movie>',
    args: true,
	async execute(message, args) {
        const query = 'https://api.gdriveplayer.us/v1/movie/search?title=' + args.join('%20');

    const movie  = await fetch(query).then(response => response.json());
    if (movie == null) {
        return message.channel.send(`No results found for **${args.join(' ')}**.`);
    }
    const lengthOfM = movie.length;
    
    var i;
    for(i = 0; i < lengthOfM; i++){
    const imdb = movie[i].imdb;
    const api = 'https://api.gdriveplayer.us/v1/imdb/' + imdb;
    const movieinfo  = await fetch(api).then(response => response.json());
    
        try{
            const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(movieinfo.Title)
            .setThumbnail(movieinfo.Poster)
            .addField('Released', movieinfo.Released, 1024)
            .addField('Genre', movieinfo.Genre, 1024)
            .addField('Run Time', movieinfo.Runtime, 1024)
            .addField('Director(s)', movieinfo.Director, 1024)
            .addField('Actor(s)', movieinfo.Actors, 1024)
            .addField('Plot', trim(movieinfo.Plot, 1024))
            .addField('Award(s)', movieinfo.Awards, 1024)
            .addField('Quality', movie[i].quality, 1024)
            .setTimestamp()
            .addField('IMDB Rating', `${movieinfo.imdbRating}/10\n${movieinfo.Rated}`)
            .addField('Link to watch', movieinfo.player_url);

            message.channel.send(embed);
        }catch (error) {
            console.error(error);
            const embedn = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(movieinfo.Title)
            .setThumbnail(movieinfo.Poster)
            .addField('Released', movieinfo.Released, 1024)
            .setTimestamp()
            .addField('Link to watch', movieinfo.player_url);
            message.channel.send(embedn);
        }
    }
	},
};





