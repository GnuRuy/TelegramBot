'use strict';
describe('Fórmula para calcular a AP3', function () {
  var expect = require('chai').expect;
  var sinon = require('sinon');

  var command = require('../formula_ap3');
  var MSG = require('./fake_message');

  it('Deve ter um atributo de ajuda', () => expect(command).to.have.property('help').and.to.be.a('string'));

  describe('Expressão regular', function () {
    it('Deve ter um atributo com a expressão regular', () => expect(command).to.have.property('RE_PATTERN').and.to.be.a('regexp'));

    it('O regex deve funcionar com os padrões de mensagens', () => {
      var expressoes = [
        'Qual a fórmula da Ap3',
        'Qual é a formula da ap3',
        'Qual e a fórmula da aP3',
        'Qual é a fórmula da ap3',
        'Qual e a formula da AP3',
        'Alguem sabe qual e a formula da ap3?',
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

    it('Deve enviar uma mensagem com a fórmula', () => {
      var bot = {
        onText: (re, callback) => {
          expect(re).to.deep.equal(command.RE_PATTERN);
          callback(MSG, null);
        },
        sendMessage: sinon.spy()
      };

      command(bot);

      var expect_msg = '@' + MSG.from.username + ' a fórmula é bem simples: \n\n`(50 - ((AP1 + AP2) * 3)) / 4`';

      sinon.assert.calledWith(bot.sendMessage, MSG.chat.id, expect_msg);
    });
  });
});
