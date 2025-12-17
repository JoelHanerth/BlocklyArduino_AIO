/**
 * Visual Blocks Language
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Geradores de código para blocos de motor
 */
'use strict';

goog.provide('Blockly.Arduino.motor');

goog.require('Blockly.Arduino');

Blockly.Arduino['brick_potencia_motores'] = function(block) {

  Blockly.Arduino.includes_['include_brick_simples'] = '#include <brickSimples.h>';

  var value_motor1 = Blockly.Arduino.valueToCode(block, 'MOTOR1', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var value_motor2 = Blockly.Arduino.valueToCode(block, 'MOTOR2', Blockly.Arduino.ORDER_ATOMIC) || '0';

  Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';

  var code = 'brick.potenciaMotores(' + value_motor1 + ', ' + value_motor2 + ');\n';
  return code;
};

// Define a direção (normal/invertido) de um motor usando Motor.setInvertido
Blockly.Arduino['brick_motor_direcao'] = function(block) {
  Blockly.Arduino.includes_['include_brick_simples'] = '#include <brickSimples.h>';
  Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';

  var motorSel = block.getFieldValue('MOTOR') || 'MOTOR1';
  var direcao = block.getFieldValue('DIRECAO') || 'MOTOR_NORMAL';

  var nomeVar, portaConst;
  if (motorSel === 'MOTOR1') {
    nomeVar = 'Motor1';
    portaConst = 'PORTA_MOTOR_1';
  } else {
    nomeVar = 'Motor2';
    portaConst = 'PORTA_MOTOR_2';
  }

  // Garante que o objeto Motor exista (padrão MOTOR_NORMAL)
  var defKey = 'brick_motor_' + portaConst.toLowerCase();
  if (!Blockly.Arduino.definitions_[defKey]) {
    Blockly.Arduino.definitions_[defKey] = 'Motor ' + nomeVar + ' = Motor(' + portaConst + ', MOTOR_NORMAL);';
  }

  var invertidoFlag = (direcao === 'MOTOR_INVERTIDO') ? 'MOTOR_INVERTIDO' : 'MOTOR_NORMAL';
  var code = nomeVar + '.setInvertido(' + invertidoFlag + ');\n';
  return code;
};

Blockly.Arduino['brick_parar_motores'] = function(block) {
  Blockly.Arduino.includes_['include_brick_simples'] = '#include <brickSimples.h>';
  Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';

  var code = 'brick.pararMotores();\n';
  return code;
};

// Cria/configura um objeto Motor para uma porta e direção escolhidas
Blockly.Arduino['brick_motor_criar'] = function(block) {
  Blockly.Arduino.includes_['include_brick_simples'] = '#include <brickSimples.h>';
  Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';

  var porta = block.getFieldValue('PORTA') || 'PORTA_MOTOR_1';
  var direcao = block.getFieldValue('DIRECAO') || 'MOTOR_NORMAL';

  var nomeVar;
  if (porta === 'PORTA_MOTOR_1') {
    nomeVar = 'Motor1';
  } else {
    nomeVar = 'Motor2';
  }

  Blockly.Arduino.definitions_['brick_motor_' + porta.toLowerCase()] =
    'Motor ' + nomeVar + ' = Motor(' + porta + ', ' + direcao + ');';

  return '';
};

// Controla a potência de um único motor (Motor1.potencia / Motor2.potencia)
Blockly.Arduino['brick_motor_potencia'] = function(block) {
  Blockly.Arduino.includes_['include_brick_simples'] = '#include <brickSimples.h>';
  Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';

  var motorSel = block.getFieldValue('MOTOR') || 'MOTOR1';
  var potencia = Blockly.Arduino.valueToCode(block, 'POTENCIA', Blockly.Arduino.ORDER_ATOMIC) || '0';

  var nomeVar, portaConst;
  if (motorSel === 'MOTOR1') {
    nomeVar = 'Motor1';
    portaConst = 'PORTA_MOTOR_1';
  } else {
    nomeVar = 'Motor2';
    portaConst = 'PORTA_MOTOR_2';
  }

  // Se ainda não existir definição explícita para esse motor, cria com MOTOR_NORMAL
  var defKey = 'brick_motor_' + portaConst.toLowerCase();
  if (!Blockly.Arduino.definitions_[defKey]) {
    Blockly.Arduino.definitions_[defKey] = 'Motor ' + nomeVar + ' = Motor(' + portaConst + ', MOTOR_NORMAL);';
  }

  var code = nomeVar + '.potencia(' + potencia + ');\n';
  return code;
};

// Freia um único motor (Motor1.frear / Motor2.frear)
Blockly.Arduino['brick_motor_frear'] = function(block) {
  Blockly.Arduino.includes_['include_brick_simples'] = '#include <brickSimples.h>';
  Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';

  var motorSel = block.getFieldValue('MOTOR') || 'MOTOR1';
  var nomeVar = (motorSel === 'MOTOR1') ? 'Motor1' : 'Motor2';

  var code = nomeVar + '.frear();\n';
  return code;
};

// Define quais motores serão usados como motores de movimento (esquerdo/direito)
Blockly.Arduino['brick_motores_movimento'] = function(block) {
  Blockly.Arduino.includes_['include_brick_simples'] = '#include <brickSimples.h>';
  Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';

  var esq = block.getFieldValue('ESQ') || 'MOTOR1';
  var dir = block.getFieldValue('DIR') || 'MOTOR2';

  // Garante que os objetos Motor1 e Motor2 existam (com MOTOR_NORMAL por padrão)
  var defKey1 = 'brick_motor_' + 'PORTA_MOTOR_1'.toLowerCase();
  if (!Blockly.Arduino.definitions_[defKey1]) {
    Blockly.Arduino.definitions_[defKey1] = 'Motor Motor1 = Motor(PORTA_MOTOR_1, MOTOR_NORMAL);';
  }
  var defKey2 = 'brick_motor_' + 'PORTA_MOTOR_2'.toLowerCase();
  if (!Blockly.Arduino.definitions_[defKey2]) {
    Blockly.Arduino.definitions_[defKey2] = 'Motor Motor2 = Motor(PORTA_MOTOR_2, MOTOR_NORMAL);';
  }

  // Monta a chamada de adiciona na ordem escolhida
  var leftRef = (esq === 'MOTOR1') ? 'Motor1' : 'Motor2';
  var rightRef = (dir === 'MOTOR1') ? 'Motor1' : 'Motor2';

  Blockly.Arduino.setups_['setup_brick_adiciona_motores'] =
    'brick.adiciona(' + leftRef + ', ' + rightRef + ');';

  return '';
};
