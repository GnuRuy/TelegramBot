'use strict';
describe('Mensagem de boas vindas', function () {
  var expect = require('chai').expect;
  var sinon = require('sinon');

  var command = require('../boas_vindas');
  var MSG = require('./fake_message');

  describe('Enviar mensagem', function () {
    it('O módulo deve exportar uma função', () => expect(command).to.be.a('function'));

    it('Deve chamar a função do bot para captura das mensages', () => {
      var bot = {
        on: sinon.spy()
      };

      command(bot);

      sinon.assert.calledWith(bot.on, 'new_chat_participant', sinon.match.func);
    });

    it('Deve enviar uma mensagem com uma mensagem de boas vindas', () => {
      var bot = {
        on: (re, callback) => {
          expect(re).to.deep.equal('new_chat_participant');
          callback(MSG, null);
        },
        sendMessage: sinon.spy()
      };

      command(bot);

      var expect_msg = 'Bem vindo @' + (MSG.new_chat_participant.username || MSG.new_chat_participant.first_name);

      sinon.assert.calledWith(bot.sendMessage, MSG.chat.id, expect_msg);
    });
  });
});
