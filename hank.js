var Discord = require("discord.js");

var bot = new Discord.Client();
var quotes = require("./hank_quotes.json");

var quoteList = Object.keys(quotes);

Array.prototype.unique = function(){
  return this.filter(
      function(a){return !this[a] ? this[a] = true : false;}, {}
  );
}


// Listen for any message, say to him/her in the room
bot.on("message", function(message) {
	console.log(message);
	if (message.author.id != "198117897141223424") {
		var quoteReturn = []
		var lowerText = message.content.toLowerCase();
		var stripText = lowerText.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, "").replace(/\s{2,}/g," ");
		var parsedText = stripText.split(' ');
		parsedText.forEach(function(item) {
			if (quoteList.indexOf(item) > -1) {
				quoteReturn.push(quotes[item]);
			}
		});
		quoteReturn.unique().forEach(function(quote) { 
				bot.reply(message, quote, function(error, message) { console.log(error, message);});
			});
		}
});

bot.login("", "");
// If you still need to login with email and password, use mybot.login("email", "password");
