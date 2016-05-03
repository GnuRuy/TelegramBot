module.exports = function (bot) {
  bot.onText(/\/?help/i, function (msg, match) {
    var chatId = msg.chat.id;
    var message = [
      'Lista de comandos:',
      '/gnu_eu_vou_passar - Saiba se você vai passar ou não',
      '/gnu_say_hello - Eu vou de dar olá',
      '/gnu_say_fuckyou - Eu vou mandar você se fuder',
      '/gnu_tchau - Eu vou te dar tchau',
      '/help - VOu tentar te ajudar',
    ];

    bot.sendMessage(chatId, message.join("\n"));
  });
};
