var sprintf = require('sprintf-js').sprintf;

module.exports = function (bot) {
  bot.onText(/qual.*(?:é|e).*a.*f(?:ó|o)rmula.*da.*m(?:é|e)dia/i, function (msg, match) {
    bot.sendMessage(msg.chat.id, sprintf("@%s a formulá é bem simples: \n\n`abs((AP1 + AP2) * 3 + AP3 * 4 / 10)`", msg.from.username));
  });
};
