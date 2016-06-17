'use strict';
var sprintf = require('sprintf-js').sprintf;

var formula = '(50 - ((AP1 + AP2) * 3)) / 4';

module.exports = BoasVindas;

BoasVindas.help = '';

/**
 * Este comando é utilizado para dar as boas vindas aos novos membros
 * @param {Bot} bot Interface do bot
 */
function BoasVindas(bot) {
  bot.on('new_chat_participant', (msg) => {
    bot.sendMessage(msg.chat.id, sprintf("Bem vindo @%s", msg.new_chat_participant.username || msg.new_chat_participant.first_name));
  });
}
