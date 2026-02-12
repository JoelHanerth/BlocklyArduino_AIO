/**
 * @fileoverview Geradores de código para o Teclado do Brick
 */
'use strict';

goog.provide('Blockly.Arduino.teclado');

goog.require('Blockly.Arduino');

// Garante que exista um objeto Teclado para a porta I2C escolhida
// Nomes gerados: teclado_porta_i2c_1, teclado_porta_i2c_2, ...
function brickEnsureTecladoForPort(porta) {
  // sufixo numérico da porta (1..5)
  var sufixo = porta.charAt(porta.length - 1);
  var varName = 'teclado_porta_i2c_' + sufixo;

  var defKey = 'teclado_' + porta.toLowerCase();
  if (!Blockly.Arduino.definitions_[defKey]) {
    // Inclui a biblioteca do Brick
    Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';

    // Cria o objeto Teclado para essa porta
    Blockly.Arduino.definitions_[defKey] =
      'Teclado ' + varName + ' = Teclado(' + porta + ');';

    // Garante inicialização do Brick, se não houver init manual
    if (!Blockly.Arduino.definitions_['brick_manual_init']) {
      Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
    }

    // Registra esse teclado específico no Brick (que chama init() internamente)
    Blockly.Arduino.setups_['setup_teclado_' + porta.toLowerCase()] =
      'brick.adiciona(' + varName + ');';
  }

  return varName;
}

// Bloco: teclado botão apertado?
Blockly.Arduino['brick_teclado_le_botao'] = function(block) {
  var porta = block.getFieldValue('PORTA') || 'PORTA_I2C_3';
  var botao = block.getFieldValue('BOTAO') || '1';

  var varName = brickEnsureTecladoForPort(porta);

  var code = '(' + varName + '.leBotao(' + botao + ') == Teclado::APERTADO)';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// Bloco: teclado altera LED
Blockly.Arduino['brick_teclado_altera_led'] = function(block) {
  var porta = block.getFieldValue('PORTA') || 'PORTA_I2C_3';
  var led = block.getFieldValue('LED') || '1';
  var estadoField = block.getFieldValue('ESTADO') || 'TRUE';

  var varName = brickEnsureTecladoForPort(porta);

  var estado = (estadoField === 'TRUE') ? 'true' : 'false';
  var code = varName + '.alteraLed(' + led + ', ' + estado + ');\n';
  return code;
};
