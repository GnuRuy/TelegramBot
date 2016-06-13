module.exports = function (bot) {
  bot.onText(/\/?(?:gnu.)?(say.bye|tchau|xau|bie|bye|at(?:e|é).(?:logo|mais))/i, function (msg, match) {
    var chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Vá e não volte tão cedo');
  });
};
