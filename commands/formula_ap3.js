var sprintf = require('sprintf-js').sprintf;

module.exports = function (bot) {
  bot.onText(/qual.*(?:é|e)?.*a.*f(?:ó|o)rmula.*da.*ap3/i, function (msg, match) {
    bot.sendMessage(msg.chat.id, sprintf("@%s a fórmula é bem simples: \n\n`7,0 na ap2 6,5 na ap2 (50 - ((AP1 + AP2) * 3)) / 4`", msg.from.username));
  });
};
