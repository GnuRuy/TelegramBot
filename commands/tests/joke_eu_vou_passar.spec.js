'use strict';
describe('Piada: eu vou passar', function () {
  var expect = require('chai').expect;
  var sinon = require('sinon');

  var command = require('../joke_eu_vou_passar');
  var MSG = require('./fake_message');

  it('Deve ter um atributo de ajuda', () => expect(command).to.have.property('help').and.to.be.a('string'));

  describe('Enviar mensagem', function () {
    it('O módulo deve exportar uma função', () => expect(command).to.be.a('function'));

    it('Deve chamar a função do bot para captura das mensages', () => {
      var bot = {
        onText: sinon.spy()
      };

      command(bot);

      sinon.assert.calledWith(bot.onText, /eu.*vou.*passar/i, sinon.match.func);
    });

    it('Deve enviar uma mensagem com uma mensagem de boas vindas', () => {
      var bot = {
        onText: (re, callback) => {
          expect(re).to.deep.equal(/eu.*vou.*passar/i);
          callback(MSG, null);
        },
        sendMessage: sinon.spy()
      };

      command(bot);

      sinon.assert.calledWith(bot.sendMessage, MSG.chat.id, sinon.match.string);
    });
  });
});
