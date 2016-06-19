'use strict';
var sprintf = require('sprintf-js').sprintf;

var formula = '(50 - ((AP1 + AP2) * 3)) / 4';

module.exports = FormulaDaAp3;

FormulaDaAp3.help = 'Para ver a fórmula da AP3 diga: "Qual é a fórmula da AP3"';
FormulaDaAp3.RE_PATTERN = /qual.*(?:é|e)?.*a.*f(?:ó|o)rmula.*da.*ap3/i;

/**
 * Este comando possibilita que o usuário veja a fórmula
 * para calcular a nota para AP3
 * @param {Bot} bot Interface do bot
 */
function FormulaDaAp3(bot) {
  bot.onText(FormulaDaAp3.RE_PATTERN, (msg) => {
    bot.sendMessage(msg.chat.id, sprintf("@%s a fórmula é bem simples: \n\n`%s`", msg.from.username, formula));
  });
}
