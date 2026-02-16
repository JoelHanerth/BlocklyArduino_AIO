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

// Função auxiliar: garante definição de um Motor para a porta escolhida
function brickEnsureMotorForPort(portaConst, direcaoOpt) {

  Blockly.Arduino.includes_['define_suporte_motor'] = '#define SUPORTE_MOTOR 1';
  // Este gerador não cuida de includes nem de brick.inicializa(); isso é feito em motores.js

  var sufixo = portaConst.charAt(portaConst.length - 1);
  var varName = 'motor_porta_' + sufixo;
  var defKey = 'brick_motor_' + portaConst.toLowerCase();

  if (direcaoOpt) {
    // Quando uma direção é passada, sempre força a definição com essa direção
    Blockly.Arduino.definitions_[defKey] =
      'Motor ' + varName + '(' + portaConst + ', ' + direcaoOpt + ');';
  } else if (!Blockly.Arduino.definitions_[defKey]) {
    // Caso contrário, garante uma definição padrão se ainda não existir
    Blockly.Arduino.definitions_[defKey] =
      'Motor ' + varName + '(' + portaConst + ', MOTOR_NORMAL);';
  }

  return varName;
}


// Define a direção (normal/invertido) de um motor usando Motor.setInvertido
Blockly.Arduino['brick_motor_direcao'] = function(block) {

  var motorSel = block.getFieldValue('MOTOR') || 'MOTOR1';
  var direcao = block.getFieldValue('DIRECAO') || 'MOTOR_NORMAL';

  var nomeVar, portaConst;
  if (motorSel === 'MOTOR1') {
    portaConst = 'PORTA_MOTOR_1';
  } else {
    portaConst = 'PORTA_MOTOR_2';
  }

  // Garante que o objeto Motor exista (padrão MOTOR_NORMAL) para a porta escolhida
  nomeVar = brickEnsureMotorForPort(portaConst, null);

  var invertidoFlag = (direcao === 'MOTOR_INVERTIDO') ? 'MOTOR_INVERTIDO' : 'MOTOR_NORMAL';
  var code = nomeVar + '.setInvertido(' + invertidoFlag + ');\n';
  return code;
};

// Cria/configura um objeto Motor para uma porta e direção escolhidas
Blockly.Arduino['brick_motor_criar'] = function(block) {

  var porta = block.getFieldValue('PORTA') || 'PORTA_MOTOR_1';
  var direcao = block.getFieldValue('DIRECAO') || 'MOTOR_NORMAL';

  // Força a definição do motor da porta com a direção escolhida
  brickEnsureMotorForPort(porta, direcao);

  return '';
};

// Controla a potência de um único motor (Motor1.potencia / Motor2.potencia)
Blockly.Arduino['brick_motor_potencia'] = function(block) {

  var motorSel = block.getFieldValue('MOTOR') || 'MOTOR1';
  var potencia = Blockly.Arduino.valueToCode(block, 'POTENCIA', Blockly.Arduino.ORDER_ATOMIC) || '0';

  var nomeVar, portaConst;
  if (motorSel === 'MOTOR1') {
    portaConst = 'PORTA_MOTOR_1';
  } else {
    portaConst = 'PORTA_MOTOR_2';
  }

  // Garante que o objeto Motor exista
  nomeVar = brickEnsureMotorForPort(portaConst, null);

  var code = nomeVar + '.potencia(' + potencia + ');\n';
  return code;
};

// Freia um único motor (Motor1.frear / Motor2.frear)
Blockly.Arduino['brick_motor_frear'] = function(block) {

  var motorSel = block.getFieldValue('MOTOR') || 'MOTOR1';
  var portaConst = (motorSel === 'MOTOR1') ? 'PORTA_MOTOR_1' : 'PORTA_MOTOR_2';

  var nomeVar = brickEnsureMotorForPort(portaConst, null);

  var code = nomeVar + '.frear();\n';
  return code;
};

// Define a potência padrão (%) de um único motor (Motor1.setPotenciaPadrao / Motor2.setPotenciaPadrao)
Blockly.Arduino['brick_motor_potencia_padrao'] = function(block) {

  var motorSel = block.getFieldValue('MOTOR') || 'MOTOR1';
  var potencia = Blockly.Arduino.valueToCode(block, 'POTENCIA', Blockly.Arduino.ORDER_ATOMIC) || '0';

  var nomeVar, portaConst;
  if (motorSel === 'MOTOR1') {
    portaConst = 'PORTA_MOTOR_1';
  } else {
    portaConst = 'PORTA_MOTOR_2';
  }

  // Garante que o objeto Motor exista
  nomeVar = brickEnsureMotorForPort(portaConst, null);

  var code = nomeVar + '.setPotenciaPadrao(' + potencia + ');\n';
  return code;
};

// Inicia o motor usando a potência padrão configurada (Motor1.potencia / Motor2.potencia)
Blockly.Arduino['brick_motor_iniciar'] = function(block) {

  var motorSel = block.getFieldValue('MOTOR') || 'MOTOR1';

  var nomeVar, portaConst;
  if (motorSel === 'MOTOR1') {
    portaConst = 'PORTA_MOTOR_1';
  } else {
    portaConst = 'PORTA_MOTOR_2';
  }

  // Garante que o objeto Motor exista
  nomeVar = brickEnsureMotorForPort(portaConst, null);

  var code = nomeVar + '.potencia();\n';
  return code;
};

// Aciona motor com potência informada por um tempo em segundos/ms (usa Motor.acionaPorTempo(potencia, tempoMs))
Blockly.Arduino['brick_motor_acionar_pot_tempo'] = function(block) {

  var motorSel = block.getFieldValue('MOTOR') || 'MOTOR1';
  var potencia = Blockly.Arduino.valueToCode(block, 'POTENCIA', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var tempo = Blockly.Arduino.valueToCode(block, 'TEMPO', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var unidade = block.getFieldValue('UNIDADE') || 'S';

  var nomeVar, portaConst;
  if (motorSel === 'MOTOR1') {
    portaConst = 'PORTA_MOTOR_1';
  } else {
    portaConst = 'PORTA_MOTOR_2';
  }

  // Garante que o objeto Motor exista
  nomeVar = brickEnsureMotorForPort(portaConst, null);

  var tempoMs;
  if (unidade === 'S') {
    var num = parseFloat(tempo);
    if (!isNaN(num)) {
      tempoMs = String(Math.round(num * 1000));
    } else {
      tempoMs = '1000*(' + tempo + ')';
    }
  } else {
    tempoMs = tempo;
  }

  var code = nomeVar + '.acionaPorTempo(' + potencia + ', ' + tempoMs + ');\n';
  return code;
};

// Aciona motor usando a potência padrão por um tempo em segundos/ms (usa Motor.acionaPorTempo(tempoMs))
Blockly.Arduino['brick_motor_acionar_tempo'] = function(block) {

  var motorSel = block.getFieldValue('MOTOR') || 'MOTOR1';
  var tempo = Blockly.Arduino.valueToCode(block, 'TEMPO', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var unidade = block.getFieldValue('UNIDADE') || 'S';

  var nomeVar, portaConst;
  if (motorSel === 'MOTOR1') {
    portaConst = 'PORTA_MOTOR_1';
  } else {
    portaConst = 'PORTA_MOTOR_2';
  }

  // Garante que o objeto Motor exista
  nomeVar = brickEnsureMotorForPort(portaConst, null);

  var tempoMs;
  if (unidade === 'S') {
    var num2 = parseFloat(tempo);
    if (!isNaN(num2)) {
      tempoMs = String(Math.round(num2 * 1000));
    } else {
      tempoMs = '1000*(' + tempo + ')';
    }
  } else {
    tempoMs = tempo;
  }

  var code = nomeVar + '.acionaPorTempo(' + tempoMs + ');\n';
  return code;
};