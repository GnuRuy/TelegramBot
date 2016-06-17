'use strict';
describe('Se despede do usuário', function () {
  var expect = require('chai').expect;
  var sinon = require('sinon');

  var command = require('../despedida');
  var MSG = require('./fake_message');

  it('Deve ter um atributo de ajuda', () => expect(command).to.have.property('help').and.to.be.a('string'));

  describe('Expressão regular', function () {
    it('Deve ter um atributo com a expressão regular', () => expect(command).to.have.property('RE_PATTERN').and.to.be.a('regexp'));

    it('O regex deve funcionar com os padrões de mensagens', () => {
      var expressoes = [
        'tchau',
        'xau',
        'say bye',
        'bye',
        'bie',
        'ate logo mais',
        'até logo mais',
        'ate logo',
        'até logo',
      ];

      expressoes.forEach((expressao) => expect(expressao).to.match(command.RE_PATTERN));
    });
  });

  describe('Enviar mensagem', function () {
    it('O módulo deve exportar uma função', () => expect(command).to.be.a('function'));

    it('Deve chamar a função do bot para captura das mensages', () => {
      var bot = {
        onText: sinon.spy()
      };

      command(bot);

      sinon.assert.calledWith(bot.onText, command.RE_PATTERN, sinon.match.func);
    });

    it('Deve enviar uma mensagem com uma mensagem de despedida', () => {
      var bot = {
        onText: (re, callback) => {
          expect(re).to.deep.equal(command.RE_PATTERN);
          callback(MSG, null);
        },
        sendMessage: sinon.spy()
      };

      command(bot);

      sinon.assert.calledWith(bot.sendMessage, MSG.chat.id, 'Vá e não volte tão cedo');
    });
  });
});
