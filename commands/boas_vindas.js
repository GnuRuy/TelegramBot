'use strict';
var sprintf = require('sprintf-js').sprintf;

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
