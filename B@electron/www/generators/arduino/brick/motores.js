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

// Função auxiliar: garante definição, include e registro de um Motor para a porta escolhida
function brickEnsureMotorForPort(portaConst, direcaoOpt) {
  Blockly.Arduino.includes_['define_suporte_motor'] = '#define SUPORTE_MOTOR 1';
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';
  if (!Blockly.Arduino.definitions_['brick_manual_init']) {
    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
  }

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

Blockly.Arduino['brick_potencia_motores'] = function(block) {

  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';

  var value_motor1 = Blockly.Arduino.valueToCode(block, 'MOTOR1', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var value_motor2 = Blockly.Arduino.valueToCode(block, 'MOTOR2', Blockly.Arduino.ORDER_ATOMIC) || '0';

  if (!Blockly.Arduino.definitions_['brick_manual_init']) {
    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
  }

  var code = 'brick.potenciaMotores(' + value_motor1 + ', ' + value_motor2 + ');\n';
  return code;
};

// Define a direção (normal/invertido) de um motor usando Motor.setInvertido
// (versão sincronizada com motor.js, usando nomes minúsculos: motor1/motor2)
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

Blockly.Arduino['brick_parar_motores'] = function(block) {
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';
  if (!Blockly.Arduino.definitions_['brick_manual_init']) {
    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
  }

  var code = 'brick.pararMotores();\n';
  return code;
};

// Define a potência padrão de movimento do Brick (em %) usando brick.setPotenciaPadrao
Blockly.Arduino['brick_motores_potencia_padrao'] = function(block) {
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';
  if (!Blockly.Arduino.definitions_['brick_manual_init']) {
    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
  }

  var potencia = Blockly.Arduino.valueToCode(block, 'POTENCIA', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'brick.setPotenciaPadrao(' + potencia + ');\n';
  return code;
};

// Define quais motores serão usados como motores de movimento (esquerdo/direito)
Blockly.Arduino['brick_motores_movimento'] = function(block) {
  var esq = block.getFieldValue('ESQ') || 'MOTOR1';
  var dir = block.getFieldValue('DIR') || 'MOTOR2';
  var dirEsq = block.getFieldValue('DIR_ESQ') || 'MOTOR_NORMAL';
  var dirDir = block.getFieldValue('DIR_DIR') || 'MOTOR_NORMAL';

  // Define os objetos motor1 e motor2 com a direção escolhida para cada um
  // Se MOTOR1 está como esquerdo, usa dirEsq, senão usa dirDir
  var direcaoMotor1 = (esq === 'MOTOR1') ? dirEsq : dirDir;
  // Se MOTOR2 está como esquerdo, usa dirEsq, senão usa dirDir
  var direcaoMotor2 = (esq === 'MOTOR2') ? dirEsq : dirDir;
  // Garante os motores para cada porta com a direção selecionada
  var motorPorta1 = brickEnsureMotorForPort('PORTA_MOTOR_1', direcaoMotor1);
  var motorPorta2 = brickEnsureMotorForPort('PORTA_MOTOR_2', direcaoMotor2);

  // Monta a chamada de adiciona na ordem escolhida
  var leftRef = (esq === 'MOTOR1') ? motorPorta1 : motorPorta2;
  var rightRef = (dir === 'MOTOR1') ? motorPorta1 : motorPorta2;

  Blockly.Arduino.setups_['setup_brick_adiciona_motores'] =
    'brick.adiciona(' + leftRef + ', ' + rightRef + ');';

  return '';
};

// Inicia o movimento dos dois motores na direção escolhida usando a potência padrão do Brick
Blockly.Arduino['brick_motores_iniciar_movimento'] = function(block) {
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';
  if (!Blockly.Arduino.definitions_['brick_manual_init']) {
    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
  }

  var direcao = block.getFieldValue('DIRECAO') || 'FRENTE';

  var code;
  if (direcao === 'FRENTE') {
    // Usa a potência padrão positiva
    code = 'brick.potenciaMotores(brick.getPotenciaPadrao());\n';
  } else {
    // Usa a potência padrão negativa para ré
    code = 'brick.potenciaMotores(-brick.getPotenciaPadrao());\n';
  }
  return code;
};

// Inicia o movimento dos dois motores na direção escolhida por um tempo usando a potência padrão do Brick
Blockly.Arduino['brick_motores_iniciar_movimento_tempo'] = function(block) {
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';
  if (!Blockly.Arduino.definitions_['brick_manual_init']) {
    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
  }

  var direcao = block.getFieldValue('DIRECAO') || 'FRENTE';
  var tempo = Blockly.Arduino.valueToCode(block, 'TEMPO', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var unidade = block.getFieldValue('UNIDADE') || 'S';

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

  var code;
  if (direcao === 'FRENTE') {
    // Usa a potência padrão positiva por tempo
    code = 'brick.acionaMotoresPorTempo(brick.getPotenciaPadrao(), ' + tempoMs + ');\n';
  } else {
    // Usa a potência padrão negativa (ré) por tempo
    code = 'brick.acionaMotoresPorTempo(-brick.getPotenciaPadrao(), ' + tempoMs + ');\n';
  }
  return code;
};

// Inicia o movimento dos dois motores na direção escolhida usando a potência informada
Blockly.Arduino['brick_motores_iniciar_movimento_potencia'] = function(block) {
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';
  if (!Blockly.Arduino.definitions_['brick_manual_init']) {
    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
  }

  var direcao = block.getFieldValue('DIRECAO') || 'FRENTE';
  var potencia = Blockly.Arduino.valueToCode(block, 'POTENCIA', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var potenciaExpr = potencia;

  var code;
  if (direcao === 'FRENTE') {
    code = 'brick.potenciaMotores(' + potenciaExpr + ');\n';
  } else {
    code = 'brick.potenciaMotores(-' + potenciaExpr + ');\n';
  }
  return code;
};

// Move os dois motores na direção escolhida por um tempo usando a potência informada
Blockly.Arduino['brick_motores_mover_tempo_potencia'] = function(block) {
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';
  if (!Blockly.Arduino.definitions_['brick_manual_init']) {
    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
  }

  var direcao = block.getFieldValue('DIRECAO') || 'FRENTE';
  var tempo = Blockly.Arduino.valueToCode(block, 'TEMPO', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var unidade = block.getFieldValue('UNIDADE') || 'S';
  var potencia = Blockly.Arduino.valueToCode(block, 'POTENCIA', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var potenciaExpr = potencia;

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

  var code;
  if (direcao === 'FRENTE') {
    code = 'brick.acionaMotoresPorTempo(' + potenciaExpr + ', ' + tempoMs + ');\n';
  } else {
    code = 'brick.acionaMotoresPorTempo(-' + potenciaExpr + ', ' + tempoMs + ');\n';
  }
  return code;
};

// Inicia o movimento reto com giroscópio
Blockly.Arduino['brick_motores_iniciar_movimento_reto_gyro'] = function(block) {
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';
  if (!Blockly.Arduino.definitions_['brick_manual_init']) {
    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
  }

  var potencia = Blockly.Arduino.valueToCode(block, 'POTENCIA', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'brick.andarPraFrente(' + potencia + ');\n';
  return code;
};