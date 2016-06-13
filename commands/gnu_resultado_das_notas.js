var sprintf = require('sprintf-js').sprintf;

module.exports = function (bot) {
  // bot.onText(/\/gnu_say_bye/i, function (msg, match) {
  //   var chatId = msg.chat.id;
  //   bot.sendMessage(chatId, 'Vá e não volte tão cedo');
  // });

  function extractNota(mensagem, nota) {
    var re = new RegExp('([0-9](?:,|\\.)?[0-9]?)\\s*na\\s*(AP' + nota + ')', 'i');
    mensagem += ''; // Converte para string
    var results = mensagem.match(re);

    if (results) {
      var valor = parseFloat(results[1].replace(',', '.'));
      return valor;
    }
    return undefined;
  }

  // [5] na [AP1] e [6] na [AP2]
  bot.onText(/([0-9](?:,|\.)?[0-9]?)\s*na\s*(AP[0-9])/i, function (msg, match) {
    var message, resultado;

    var ap1 = extractNota(msg.text, 1) || 0;
    var ap2 = extractNota(msg.text, 2) || 0;
    var ap3 = extractNota(msg.text, 3);

    if (ap3) {
      resultado = Math.abs(( (ap1 + ap2) * 3 + ap3 * 4 ) / 10).toFixed(1);

      if (resultado >= 5) {
        message = 'Parabéns @%s você esta aprovado com média %s.';
      } else {
        message = 'Avisei diversas vezes para você estudar @%s, você está reprovado com média %s.';
      }
    } else {

      resultado = ((50 - ((ap1 + ap2) * 3)) / 4).toFixed(1);

      if (resultado)  {
        message = '@%s você precisa tirar %s na AP3 pra passar.';
      } else  {
        message = 'Parabéns @%s você precisa tirar %s na AP3, hehehehe em outras palavras tão faz se você fizer ou não.';
      }
    }

    bot.sendMessage(msg.chat.id, sprintf(message, msg.from.username, resultado.toString().replace('.', ',')));
  });
};
