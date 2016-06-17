'use strict';
module.exports = Despedida;

Despedida.help = '';
Despedida.RE_PATTERN = /(say.bye|tchau|xau|bie|bye|at(?:e|é).(?:logo|mais))/i;

/**
 * Este comando é utilizado para se despedir de um membro
 * @param {Bot} bot Interface do bot
 */
function Despedida(bot) {
  bot.onText(Despedida.RE_PATTERN, (msg) => {
    var chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Vá e não volte tão cedo');
  });
}
