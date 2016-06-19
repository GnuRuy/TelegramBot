'use strict';
var sprintf = require('sprintf-js').sprintf;

var formula = 'abs((AP1 + AP2) * 3 + AP3 * 4 / 10)';

module.exports = FormulaDaMedia;

FormulaDaMedia.help = 'Para ver a fórmula da média diga: "Qual é a fórmula da média"';
FormulaDaMedia.RE_PATTERN = /qual.*(?:é|e)?.*a.*f(?:ó|o)rmula.*da.*m(?:é|e)dia/i;

/**
 * Este comando possibilita que o usuário veja a fórmula para calcular a média
 * @param {Bot} bot Interface do bot
 */
function FormulaDaMedia(bot) {
  bot.onText(FormulaDaMedia.RE_PATTERN, (msg) => {
    bot.sendMessage(msg.chat.id, sprintf("@%s a fórmula é bem simples: \n\n`%s`", msg.from.username, formula));
  });
}
