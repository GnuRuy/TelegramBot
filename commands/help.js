module.exports = function (bot) {
  bot.onText(/\/?help/i, function (msg, match) {
    var chatId = msg.chat.id;
    var message = [
      'Lista de comandos:' + "\n",

      'Para calcular a média diga: "0,0 na AP1 0,0 na AP2 0,0 na AP3" ou "Tirei 1,3 na AP1 e 5,7 na AP2 e agora eu tirei 2,0 na AP3"' + "\n",
      'Para saber quanto você precisa na AP3 diga: "0,0 na AP1 0,0 na AP2" ou "Tirei 1,3 na AP1 e 5,7 na AP2"' + "\n",
      'Para ver a fórmula da média diga: "Qual é a fórmula da média"' + "\n",
      'Para ver a fórmula da AP3 diga: "Qual é a fórmula da AP3"' + "\n",
      'Para ter minha opinião se você vai passar diga: "Eu vou passar?"' + "\n",

      '/gnu_eu_vou_passar - Saiba se você vai passar ou não',
      '/gnu_say_hello - Eu vou de dar olá',
      '/gnu_tchau - Eu vou te dar tchau',

      '/help - Vou tentar te ajudar',
    ];

    bot.sendMessage(chatId, message.join("\n"));
  });
};
