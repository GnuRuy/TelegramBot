module.exports = function (bot) {
  bot.onText(/\/gnu_say_hello/, function (msg, match) {
    var chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Olá ' + msg.from.first_name + "\n");
  });
};
