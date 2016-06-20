'use strict';
describe('Fórmula para calcular a final', function () {
  var expect = require('chai').expect;
  var sinon = require('sinon');

  var command = require('../resultado_das_notas');
  var MSG = require('./fake_message');

  it('Deve ter um atributo de ajuda', () => expect(command).to.have.property('help').and.to.be.a('string'));

  describe('Expressão regular', function () {
    it('Deve ter um atributo com a expressão regular', () => expect(command).to.have.property('RE_PATTERN').and.to.be.a('regexp'));

    it('O regex deve funcionar com os padrões de mensagens', () => {
      var expressoes = [
        '2 na ap1',
        'na ap1 na ap2',
        '2 na ap1 na ap2',
        'na Ap1 2 na aP2',
        '5 na ap2 e na ap3 e 1 na ap1',
        'Tirei 5 na ap2 e até onde eu me lembro tirei 1 na ap3 e na ap1',
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

      sinon.assert.calledWith(bot.sendMessage, MSG.chat.id, sinon.match.string);
    });

    it('Deve calcular a nota a ser tirada na ap3', () => {
      var bot = {
        onText: (re, callback) => {
          expect(re).to.deep.equal(command.RE_PATTERN);
          var msg = JSON.parse(JSON.stringify(MSG));
          msg.text = '5 na ap1 e 7 na ap2';
          callback(msg, null);
        },
        sendMessage: sinon.spy()
      };

      command(bot);

      var expect_msg = '@' + MSG.from.username + ' você precisa tirar 3,5 na AP3 pra passar.';

      sinon.assert.calledWith(bot.sendMessage, MSG.chat.id, expect_msg);
    });

    it('Deve calcular a nota e informar que o usuário foi reprovado', () => {
      var bot = {
        onText: (re, callback) => {
          expect(re).to.deep.equal(command.RE_PATTERN);
          var msg = JSON.parse(JSON.stringify(MSG));
          msg.text = '1.6 na ap1 e 1.6 na ap2';
          callback(msg, null);
        },
        sendMessage: sinon.spy()
      };

      command(bot);

      var expect_msg = '@' + MSG.from.username + ' foram muitas as vezes que eu avisei para você estudar e você não me deu ouvidos, quem sabe na próxima vez você não estuda mais...';

      sinon.assert.calledWith(bot.sendMessage, MSG.chat.id, expect_msg);
    });

    it('Deve calcular a nota a ser tirada na ap3 e informar ao usuário que ele está aprovado', () => {
      var bot = {
        onText: (re, callback) => {
          expect(re).to.deep.equal(command.RE_PATTERN);
          var msg = JSON.parse(JSON.stringify(MSG));
          msg.text = '8.3 na ap1 e 8.3 na ap2';
          callback(msg, null);
        },
        sendMessage: sinon.spy()
      };

      command(bot);

      var expect_msg = 'Parabéns @' + MSG.from.username + ' você está quase aprovado, mas infelizmente você ainda deve fazer a AP3.';

      sinon.assert.calledWith(bot.sendMessage, MSG.chat.id, expect_msg);
    });

    it('Deve calcular a média e informar que o usuário não foi aprovado', () => {
      var bot = {
        onText: (re, callback) => {
          expect(re).to.deep.equal(command.RE_PATTERN);
          var msg = JSON.parse(JSON.stringify(MSG));
          msg.text = '5.3 na ap1 e 7.3 na ap2 1 na ap3';
          callback(msg, null);
        },
        sendMessage: sinon.spy()
      };

      command(bot);

      var expect_msg = 'Avisei diversas vezes para você estudar @' + MSG.from.username + ', você está reprovado com média 4,2.';

      sinon.assert.calledWith(bot.sendMessage, MSG.chat.id, expect_msg);
    });

    it('Deve calcular a média e informar que o usuário foi aprovado', () => {
      var bot = {
        onText: (re, callback) => {
          expect(re).to.deep.equal(command.RE_PATTERN);
          var msg = JSON.parse(JSON.stringify(MSG));
          msg.text = '5.3 na ap1 e 7.3 na ap2 5 na ap3';
          callback(msg, null);
        },
        sendMessage: sinon.spy()
      };

      command(bot);

      var expect_msg = 'Parabéns @' + MSG.from.username + ' você está aprovado com média 5,8.';

      sinon.assert.calledWith(bot.sendMessage, MSG.chat.id, expect_msg);
    });

    it('Deve retornar uma mensagem perguntando se o usuário acha que o bot é burro para notas maiores que 10', () => {
      var bot = {
        onText: (re, callback) => {
          expect(re).to.deep.equal(command.RE_PATTERN);
          var msg = JSON.parse(JSON.stringify(MSG));
          msg.text = '11 na ap1 e 20 na ap2 50 na ap3';
          callback(msg, null);
        },
        sendMessage: sinon.spy()
      };

      command(bot);

      var expect_msg = '@' + MSG.from.username + ' onde foi que você já viu uma nota maior que 10? Escreva direito rapaz...';

      sinon.assert.calledWith(bot.sendMessage, MSG.chat.id, expect_msg);
    });

    it('Deve retornar uma mensagem perguntando se o usuário acha que o bot é burro para notas menores que 0', () => {
      var bot = {
        onText: (re, callback) => {
          expect(re).to.deep.equal(command.RE_PATTERN);
          var msg = JSON.parse(JSON.stringify(MSG));
          msg.text = '0 na ap1 e -1 na ap2 -50 na ap3';
          callback(msg, null);
        },
        sendMessage: sinon.spy()
      };

      command(bot);

      var expect_msg = '@' + MSG.from.username + ' onde foi que você já viu uma nota negativa? Escreva direito rapaz... Tá achando que é Deus agora pra tirar uma nota que nem existe?';

      sinon.assert.calledWith(bot.sendMessage, MSG.chat.id, expect_msg);
    });
  });
});
