var TelegramBot = require('node-telegram-bot-api');
var config = require('./config');

var bot = new TelegramBot(config.token, config.options);

var commands = require('./commands');

commands.forEach(function (command) {
  command(bot);
});

bot.getMe().then(function (me) {
  console.log('Olá, menu nome é %s!', me.username);
});

bot.on('message', function (message) {
  console.log(message);
});
