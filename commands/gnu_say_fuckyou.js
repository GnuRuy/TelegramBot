module.exports = function (bot) {
  bot.onText(/\/gnu_say_fuckyou/i, function (msg, match) {
    var chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Tá bom, você quem pediu, foda-se ' + msg.from.first_name);
  });
};
