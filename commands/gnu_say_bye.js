module.exports = function (bot) {
  bot.onText(/\/gnu_say_bye/i, function (msg, match) {
    var chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Vá e não volte tão cedo');
  });
};
