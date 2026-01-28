/**
 * @fileoverview Geradores de código para servos do Brick
 */
'use strict';

goog.provide('Blockly.Arduino.brick_servos');

goog.require('Blockly.Arduino');

// Função auxiliar: garante que a porta de servo foi iniciada
function brickEnsureServoPort(porta) {
  // usamos um setup por porta para chamar servos.iniciaServo(PORTA_SERVO_X);
  Blockly.Arduino.includes_['include_brick_simples'] = '#include <brickSimples.h>';
  if (!Blockly.Arduino.definitions_['brick_manual_init']) {
    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
  }

  // chave de setup específica por porta
  var key = 'setup_brick_servo_' + porta.toLowerCase();
  if (!Blockly.Arduino.setups_[key]) {
    Blockly.Arduino.setups_[key] = 'servos.iniciaServo(' + porta + ');';
  }
}

// Move servo para um ângulo
Blockly.Arduino['brick_servo_mover'] = function(block) {
  var porta = block.getFieldValue('PORTA') || 'PORTA_SERVO_1';
  var angulo = Blockly.Arduino.valueToCode(block, 'ANGULO', Blockly.Arduino.ORDER_ATOMIC) || '0';

  brickEnsureServoPort(porta);

  var code = 'servos.moveServo(' + porta + ', ' + angulo + ');\n';
  return code;
};

// Move servo para um ângulo ao longo de um tempo em ms
Blockly.Arduino['brick_servo_mover_tempo'] = function(block) {
  var porta = block.getFieldValue('PORTA') || 'PORTA_SERVO_1';
  var angulo = Blockly.Arduino.valueToCode(block, 'ANGULO', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var tempo = Blockly.Arduino.valueToCode(block, 'TEMPO', Blockly.Arduino.ORDER_ATOMIC) || '0';

  brickEnsureServoPort(porta);

  var code = 'servos.moveServoTempo(' + porta + ', ' + angulo + ', ' + tempo + ');\n';
  return code;
};
