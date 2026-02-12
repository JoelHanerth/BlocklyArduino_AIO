/**
 * @fileoverview Gerador de código para blocos Brick
 */
'use strict';

goog.provide('Blockly.Arduino.brick');

goog.require('Blockly.Arduino');

// Bloco que registra uma inicialização manual do Brick.
// A chamada brick.inicializa() será gerada no início do setup().
Blockly.Arduino['brick_inicializa'] = function(block) {
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';

  // Marca que há inicialização manual e remove qualquer inicialização automática registrada.
  Blockly.Arduino.definitions_['brick_manual_init'] = '// inicialização do Brick feita manualmente pelo usuário';
  delete Blockly.Arduino.setups_['setup_brick_simples'];

  // Usa uma chave numérica para garantir que esta linha seja
  // emitida antes das demais entradas de setup.
  Blockly.Arduino.setups_[0] = 'brick.inicializa();';

  // Nada é gerado diretamente onde o bloco é colocado.
  return '';
};

Blockly.Arduino['brick_atualizabrick'] = function(block) {
  // Garante include e, se não houver inicialização manual, registra inicialização automática no setup.
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';
  if (!Blockly.Arduino.definitions_['brick_manual_init']) {
    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
  }

  var code = 'brick.atualiza();\n';
  return code;
};

// Imprime um valor no terminal serial
Blockly.Arduino['brick_imprimir_terminal'] = function(block) {
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';
  if (!Blockly.Arduino.definitions_['brick_manual_init']) {
    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
  }

  var valor = Blockly.Arduino.valueToCode(block, 'TEXTO', Blockly.Arduino.ORDER_ATOMIC) || '';
  var modo = block.getFieldValue('MODO') || 'PRINT';
  var func = (modo === 'PRINTLN') ? 'println' : 'print';

  var code = 'Serial.' + func + '(' + valor + ');\n';
  return code;
};

// Verifica se o botão do Brick está pressionado
Blockly.Arduino['brick_botao_apertado'] = function(block) {
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';
  if (!Blockly.Arduino.definitions_['brick_manual_init']) {
    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
  }

  var code = 'brick.botaoApertado()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// Aguarda até que o botão do Brick seja pressionado
Blockly.Arduino['brick_aguarde_botao_apertado'] = function(block) {
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';
  if (!Blockly.Arduino.definitions_['brick_manual_init']) {
    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
  }

  var code = 'while (!brick.botaoApertado()) {\n  delay(10);\n}\n';
  return code;
};

// Espera usando o método espera do Brick
Blockly.Arduino['brick_espere'] = function(block) {
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';
  if (!Blockly.Arduino.definitions_['brick_manual_init']) {
    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
  }

  var tempo = Blockly.Arduino.valueToCode(block, 'TEMPO', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'brick.espera(' + tempo + ');\n';
  return code;
};