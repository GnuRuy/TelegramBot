'use strict';

var messages = [
  'nem vou te responder nada...',
  'do jeito que você estuda....',
  'você ta de brincadeira né? Claro que você não vai passar...',
  'você ta mais fudido do que porca de parafuso!',
  'fé em seus estudos que você passa',
  'eu que vou saber? Se vira e estuda.',
];

module.exports = EuVouPassar;

EuVouPassar.help = '';

/**
 * Retorna uma mensagem randomicamente, respondendo ao usuário
 * se ele vai passar ou perder.
 *
 * @param {Bot} bot Interface do bot
 */
function EuVouPassar(bot) {
  bot.onText(/eu.*vou.*passar/i, (msg) => {
    var message = messages[Math.floor(Math.random() * messages.length)];
    var chatId = msg.chat.id;
    bot.sendMessage(chatId, msg.from.first_name + ', ' + message);
  });
}
