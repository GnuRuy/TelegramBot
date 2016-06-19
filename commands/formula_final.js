'use strict';
var sprintf = require('sprintf-js').sprintf;

var formula = '(5 - ((AP1 + AP2) / 2) * 0.6) / 0.4';

module.exports = FormulaDaFinal;

FormulaDaFinal.help = 'Para ver a fórmula da antiga prova final diga: "Qual é a fórmula da final"';
FormulaDaFinal.RE_PATTERN = /qual.*(?:é|e)?.*a.*f(?:ó|o)rmula.*da.*final/i;

/**
 * Este comando possibilita que o usuário veja a antiga fórmula
 * para calcular a a nota para a prova final
 * @param {Bot} bot Interface do bot
 */
function FormulaDaFinal (bot) {
  bot.onText(FormulaDaFinal.RE_PATTERN, function (msg, match) {
    bot.sendMessage(msg.chat.id, sprintf("@%s a fórmula da antiga prova final é bem simples: \n\n`%s`", msg.from.username, formula));
  });
}
