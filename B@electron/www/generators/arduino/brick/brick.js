/**
 * @fileoverview Gerador de código para blocos Brick
 */
'use strict';

goog.provide('Blockly.Arduino.brick');

goog.require('Blockly.Arduino');

Blockly.Arduino['brick_atualizabrick'] = function(block) {
  // Garante include e inicialização, mesmo que só este bloco seja usado
  Blockly.Arduino.includes_['include_brick_simples'] = '#include <brickSimples.h>';
  Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';

  var code = 'brick.atualiza();\n';
  return code;
};

// Imprime um valor no terminal serial
Blockly.Arduino['brick_imprimir_terminal'] = function(block) {
  // Garante a inicialização do Serial (caso ainda não exista)
  // Blockly.Arduino.setups_['setup_serial_115200'] = 'Serial.begin(115200);';

  var valor = Blockly.Arduino.valueToCode(block, 'TEXTO', Blockly.Arduino.ORDER_ATOMIC) || '';
  var modo = block.getFieldValue('MODO') || 'PRINT';
  var func = (modo === 'PRINTLN') ? 'println' : 'print';

  var code = 'Serial.' + func + '(' + valor + ');\n';
  return code;
};

// Verifica se o botão do Brick está pressionado
Blockly.Arduino['brick_botao_apertado'] = function(block) {
  Blockly.Arduino.includes_['include_brick_simples'] = '#include <brickSimples.h>';
  Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';

  var code = 'brick.botaoApertado()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// Aguarda até que o botão do Brick seja pressionado
Blockly.Arduino['brick_aguarde_botao_apertado'] = function(block) {
  Blockly.Arduino.includes_['include_brick_simples'] = '#include <brickSimples.h>';
  Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';

  var code = 'while (!brick.botaoApertado()) {\n  delay(10);\n}\n';
  return code;
};