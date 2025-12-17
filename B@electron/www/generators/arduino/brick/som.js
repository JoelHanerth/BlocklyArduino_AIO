/**
 * @fileoverview Geradores de código para blocos de som (buzzer) do Brick
 */
'use strict';

goog.provide('Blockly.Arduino.som');

goog.require('Blockly.Arduino');

// Toca um beep no buzzer da porta escolhida
Blockly.Arduino['brick_buzzer_beep'] = function(block) {
  Blockly.Arduino.includes_['include_brick_simples'] = '#include <brickSimples.h>';

  var porta = block.getFieldValue('PORTA') || 'PORTA_BUZZER_1';
  var buzzerVar;
  switch (porta) {
    case 'PORTA_BUZZER_1':
      buzzerVar = 'buzzer1';
      break;
    case 'PORTA_BUZZER_2':
      buzzerVar = 'buzzer2';
      break;
    case 'PORTA_BUZZER_3':
      buzzerVar = 'buzzer3';
      break;
    case 'PORTA_BUZZER_4':
      buzzerVar = 'buzzer4';
      break;
    default:
      buzzerVar = 'buzzer1';
      break;
  }

  // Garante que o buzzer dessa porta esteja instanciado e registrado no Brick
  var defKey = 'buzzer_' + porta.toLowerCase();
  if (!Blockly.Arduino.definitions_[defKey]) {
    Blockly.Arduino.definitions_[defKey] =
      'Buzzer ' + buzzerVar + ' = Buzzer(' + porta + ');';

    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
    Blockly.Arduino.setups_['setup_brick_buzzer_' + porta.toLowerCase()] =
      'brick.adiciona(' + buzzerVar + ');';
  }

  var freq = Blockly.Arduino.valueToCode(block, 'FREQ', Blockly.Arduino.ORDER_ATOMIC) || '1000';
  var dur = Blockly.Arduino.valueToCode(block, 'DUR', Blockly.Arduino.ORDER_ATOMIC) || '100';

  var code = buzzerVar + '.beep(' + freq + ', ' + dur + ');\n';
  return code;
};

// Toca uma melodia pronta (Jingle Bells ou Power Rangers) no buzzer da porta escolhida
Blockly.Arduino['brick_buzzer_iniciar_som'] = function(block) {
  Blockly.Arduino.includes_['include_brick_simples'] = '#include <brickSimples.h>';

  var porta = block.getFieldValue('PORTA') || 'PORTA_BUZZER_1';
  var buzzerVar;
  switch (porta) {
    case 'PORTA_BUZZER_1':
      buzzerVar = 'buzzer1';
      break;
    case 'PORTA_BUZZER_2':
      buzzerVar = 'buzzer2';
      break;
    case 'PORTA_BUZZER_3':
      buzzerVar = 'buzzer3';
      break;
    case 'PORTA_BUZZER_4':
      buzzerVar = 'buzzer4';
      break;
    default:
      buzzerVar = 'buzzer1';
      break;
  }

  // Garante que o buzzer dessa porta esteja instanciado e registrado no Brick
  var defKey = 'buzzer_' + porta.toLowerCase();
  if (!Blockly.Arduino.definitions_[defKey]) {
    Blockly.Arduino.definitions_[defKey] =
      'Buzzer ' + buzzerVar + ' = Buzzer(' + porta + ');';

    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
    Blockly.Arduino.setups_['setup_brick_buzzer_' + porta.toLowerCase()] =
      'brick.adiciona(' + buzzerVar + ');';
  }

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
  Blockly.Arduino.includes_['include_brick_simples'] = '#include <brickSimples.h>';

  var porta = block.getFieldValue('PORTA') || 'PORTA_BUZZER_1';
  var buzzerVar;
  switch (porta) {
    case 'PORTA_BUZZER_1':
      buzzerVar = 'buzzer1';
      break;
    case 'PORTA_BUZZER_2':
      buzzerVar = 'buzzer2';
      break;
    case 'PORTA_BUZZER_3':
      buzzerVar = 'buzzer3';
      break;
    case 'PORTA_BUZZER_4':
      buzzerVar = 'buzzer4';
      break;
    default:
      buzzerVar = 'buzzer1';
      break;
  }

  // Garante que o buzzer dessa porta esteja instanciado e registrado no Brick
  var defKey = 'buzzer_' + porta.toLowerCase();
  if (!Blockly.Arduino.definitions_[defKey]) {
    Blockly.Arduino.definitions_[defKey] =
      'Buzzer ' + buzzerVar + ' = Buzzer(' + porta + ');';

    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
    Blockly.Arduino.setups_['setup_brick_buzzer_' + porta.toLowerCase()] =
      'brick.adiciona(' + buzzerVar + ');';
  }

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
  Blockly.Arduino.includes_['include_brick_simples'] = '#include <brickSimples.h>';

  var porta = block.getFieldValue('PORTA') || 'PORTA_BUZZER_1';
  var buzzerVar;
  switch (porta) {
    case 'PORTA_BUZZER_1':
      buzzerVar = 'buzzer1';
      break;
    case 'PORTA_BUZZER_2':
      buzzerVar = 'buzzer2';
      break;
    case 'PORTA_BUZZER_3':
      buzzerVar = 'buzzer3';
      break;
    case 'PORTA_BUZZER_4':
      buzzerVar = 'buzzer4';
      break;
    default:
      buzzerVar = 'buzzer1';
      break;
  }

  // Garante que o buzzer dessa porta esteja instanciado e registrado no Brick
  var defKey = 'buzzer_' + porta.toLowerCase();
  if (!Blockly.Arduino.definitions_[defKey]) {
    Blockly.Arduino.definitions_[defKey] =
      'Buzzer ' + buzzerVar + ' = Buzzer(' + porta + ');';

    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
    Blockly.Arduino.setups_['setup_brick_buzzer_' + porta.toLowerCase()] =
      'brick.adiciona(' + buzzerVar + ');';
  }

  var code = buzzerVar + '.parar();\n';
  return code;
};
