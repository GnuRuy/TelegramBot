var sprintf = require('sprintf-js').sprintf;

module.exports = function (bot) {
  bot.onText(/qual.*(?:é|e)?.*a.*f(?:ó|o)rmula.*da.*final/i, function (msg, match) {
    bot.sendMessage(msg.chat.id, sprintf("@%s a fórmula da antiga prova final é bem simples: \n\n`(5 - ((AP1 + AP2) / 2) * 0.6) / 0.4`", msg.from.username));
  });
};
