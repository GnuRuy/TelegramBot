var messages = [
  'nem vou te responder nada...',
  'do jeito que você estuda....',
  'você ta de brincadeira né? Claro que você não vai passar...',
  'você ta mais fudido do que porca de parafuso!',
  'fé em seus estudos que você passa',
  'eu que vou saber? Se vira e estuda.',
];


module.exports = function (bot) {
  bot.onText(/\/?gnu_eu_vou_passar/i, function (msg, match) {
    var message = messages[Math.floor(Math.random() * messages.length)];
    var chatId = msg.chat.id;
    bot.sendMessage(chatId, msg.from.first_name + ', ' + message);
  });
};
