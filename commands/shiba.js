const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fetch = require('node-fetch');
const r2 = require('r2');
const querystring = require('querystring');
const trim = (str, max) => str.length > max ? `${str.slice(0, max - 3)}...` : str;

const DOG_API_URL = "https://api.thedogapi.com/v1/images/search?breed_id=222";
const dog_api_key =  "c6606084-824a-460b-b431-1e4501e03af0";
async function loadImage(sub_id)
{
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

module.exports = {
    name: 'shiba',
    description: 'Sends random shiba picture',
    
	async execute(message, args) {
        try{
			
			var images = await loadImage(message.author.username);
		
			
			var image = images[0];
			var breed = image.breeds[0];
		
			
      message.channel.send({ files: [ image.url ] } );
		
		  }catch(error)
		  {
			console.log(error)
		  }
	},
};
