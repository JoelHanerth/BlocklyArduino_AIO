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

goog.provide('Blockly.Arduino.motores');

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

// Define quais motores serão usados como motores de movimento (esquerdo/direito)
Blockly.Arduino['brick_motores_movimento'] = function(block) {
  Blockly.Arduino.includes_['include_brick_simples'] = '#include <brickSimples.h>';
  Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';

  var esq = block.getFieldValue('ESQ') || 'MOTOR1';
  var dir = block.getFieldValue('DIR') || 'MOTOR2';
  var dirEsq = block.getFieldValue('DIR_ESQ') || 'MOTOR_NORMAL';
  var dirDir = block.getFieldValue('DIR_DIR') || 'MOTOR_NORMAL';

  // Define os objetos Motor1 e Motor2 com a direção escolhida para cada um
  var defKey1 = 'brick_motor_' + 'PORTA_MOTOR_1'.toLowerCase();
  var defKey2 = 'brick_motor_' + 'PORTA_MOTOR_2'.toLowerCase();

  // Se MOTOR1 está como esquerdo, usa dirEsq, senão usa dirDir
  var direcaoMotor1 = (esq === 'MOTOR1') ? dirEsq : dirDir;
  // Se MOTOR2 está como esquerdo, usa dirEsq, senão usa dirDir
  var direcaoMotor2 = (esq === 'MOTOR2') ? dirEsq : dirDir;

  Blockly.Arduino.definitions_[defKey1] =
    'Motor Motor1 = Motor(PORTA_MOTOR_1, ' + direcaoMotor1 + ');';
  Blockly.Arduino.definitions_[defKey2] =
    'Motor Motor2 = Motor(PORTA_MOTOR_2, ' + direcaoMotor2 + ');';

  // Monta a chamada de adiciona na ordem escolhida
  var leftRef = (esq === 'MOTOR1') ? 'Motor1' : 'Motor2';
  var rightRef = (dir === 'MOTOR1') ? 'Motor1' : 'Motor2';

  Blockly.Arduino.setups_['setup_brick_adiciona_motores'] =
    'brick.adiciona(' + leftRef + ', ' + rightRef + ');';

  return '';
};
