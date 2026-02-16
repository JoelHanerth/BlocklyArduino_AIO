/**
 * @fileoverview Geradores de código para blocos de som (buzzer) do Brick
 */
'use strict';

goog.provide('Blockly.Arduino.som');

goog.require('Blockly.Arduino');

// Função auxiliar: garante definição, include e registro do Buzzer na porta escolhida
function brickEnsureBuzzerForPort(porta) {
  Blockly.Arduino.includes_['define_suporte_buzzer'] = '#define SUPORTE_BUZZER 1';
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';

  if (!Blockly.Arduino.definitions_['brick_manual_init']) {
    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
  }

  var sufixo = porta.charAt(porta.length - 1);
  var varName = 'buzzer_porta_' + sufixo;

  // Garante que o buzzer dessa porta esteja instanciado
  var defKey = 'buzzer_' + porta.toLowerCase();
  if (!Blockly.Arduino.definitions_[defKey]) {
    Blockly.Arduino.definitions_[defKey] =
      'Buzzer ' + varName + '(' + porta + ');';
  }

  Blockly.Arduino.setups_['setup_brick_buzzer_' + porta.toLowerCase()] =
    'brick.adiciona(' + varName + ');';

  return varName;
}

// Toca um beep no buzzer da porta escolhida
Blockly.Arduino['brick_buzzer_beep'] = function(block) {
  var porta = block.getFieldValue('PORTA') || 'PORTA_BUZZER_1';
  var buzzerVar = brickEnsureBuzzerForPort(porta);

  var freq = Blockly.Arduino.valueToCode(block, 'FREQ', Blockly.Arduino.ORDER_ATOMIC) || '1000';
  var dur = Blockly.Arduino.valueToCode(block, 'DUR', Blockly.Arduino.ORDER_ATOMIC) || '100';

  var code = buzzerVar + '.beep(' + freq + ', ' + dur + ');\n';
  return code;
};

// Toca uma melodia pronta (Jingle Bells ou Power Rangers) no buzzer da porta escolhida
Blockly.Arduino['brick_buzzer_iniciar_som'] = function(block) {
  var porta = block.getFieldValue('PORTA') || 'PORTA_BUZZER_1';
  var buzzerVar = brickEnsureBuzzerForPort(porta);

  var melodia = block.getFieldValue('MELODIA') || 'JINGLE';
  var code;
  if (melodia === 'POWER_RANGERS') {
    code = buzzerVar + '.powerRangers();\n';
  } else {
    // padrão: Jingle Bells
    code = buzzerVar + '.jingleBells();\n';
  }

  return code;
};

// Toca um efeito sonoro curto (alerta, sucesso ou erro) no buzzer da porta escolhida
Blockly.Arduino['brick_buzzer_iniciar_efeito'] = function(block) {
  var porta = block.getFieldValue('PORTA') || 'PORTA_BUZZER_1';
  var buzzerVar = brickEnsureBuzzerForPort(porta);

  var efeito = block.getFieldValue('EFEITO') || 'ALERTA';
  var code;
  if (efeito === 'SUCESSO') {
    code = buzzerVar + '.sucesso();\n';
  } else if (efeito === 'ERRO') {
    code = buzzerVar + '.erro();\n';
  } else {
    // padrão: alerta
    code = buzzerVar + '.alerta();\n';
  }

  return code;
};

// Para o som no buzzer da porta escolhida
Blockly.Arduino['brick_buzzer_parar'] = function(block) {
  var porta = block.getFieldValue('PORTA') || 'PORTA_BUZZER_1';
  var buzzerVar = brickEnsureBuzzerForPort(porta);

  var code = buzzerVar + '.parar();\n';
  return code;
};
