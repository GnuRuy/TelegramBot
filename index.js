var TelegramBot = require('node-telegram-bot-api');
var express = require('express');
var config = require('./config');
var app     = express();
var request = require("request");

setInterval(function () {
  request("http://gnu-bot.herokuapp.com/", function(err, res, body) {
    console.log(body);
  });
}, 3 * 60000);

var bot = new TelegramBot(config.token, config.options);

var commands = require('./commands');

(function () {
  var help = [];

  commands.forEach(function (command) {
    command(bot);
    help.push(command.help);
  });

  var message_help = help.filter((help) => help != '').join('\n\n');

  bot.onText(/\/?help/i, function (msg, match) {
    var message = [
      'Lista de comandos:',

      message_help,

      '/help - Vou tentar te ajudar',
    ];

    bot.sendMessage(msg.chat.id, message.join('\n\n'));
  });
}());


bot.getMe().then(function (me) {
  console.log('Olá, menu nome é %s!', me.username);
});

bot.on('message', function (message) {
  console.log(message);
});


app.set('port', (process.env.PORT || 5000));


//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
  console.log('App is running, server is listening on port ', app.get('port'));
});
