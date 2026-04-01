'use strict';

goog.provide('Blockly.Arduino.bluetooth');

goog.require('Blockly.Arduino');

// Função auxiliar: garante definição, include e registro de um módulo Bluetooth na porta escolhida
function brickEnsureBluetoothForPort(porta) {
  Blockly.Arduino.includes_['define_suporte_bluetooth'] = '#define SUPORTE_BLUETOOTH 1';
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';

  if (!Blockly.Arduino.definitions_['brick_manual_init']) {
    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
  }

  var sufixo = porta.charAt(porta.length - 1);
  var varName = 'bluetooth_porta_' + sufixo;
  var defKey = 'bluetooth_' + porta.toLowerCase();

  if (!Blockly.Arduino.definitions_[defKey]) {
    Blockly.Arduino.definitions_[defKey] =
      'Bluetooth ' + varName + '(' + porta + ');';

    Blockly.Arduino.setups_['setup_bluetooth_' + porta.toLowerCase()] =
      'brick.adiciona(' + varName + ');';
  }

  return varName;
}

// Enviar texto/número por Bluetooth
Blockly.Arduino['brick_bluetooth_enviar'] = function(block) {
  var porta = block.getFieldValue('PORTA') || 'PORTA_SERIAL_3';
  var modo = block.getFieldValue('MODO') || 'PRINTLN';
  var btVar = brickEnsureBluetoothForPort(porta);

  var texto = Blockly.Arduino.valueToCode(block, 'TEXTO', Blockly.Arduino.ORDER_ATOMIC) || '""';
  var func = (modo === 'PRINT') ? 'print' : 'println';

  var code = btVar + '.' + func + '(' + texto + ');\n';
  return code;
};

// Verificar se há dados disponíveis
Blockly.Arduino['brick_bluetooth_disponivel'] = function(block) {
  var porta = block.getFieldValue('PORTA') || 'PORTA_SERIAL_3';
  var btVar = brickEnsureBluetoothForPort(porta);

  var code = '(' + btVar + '.available() > 0)';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// Ler um caractere do Bluetooth
Blockly.Arduino['brick_bluetooth_ler_char'] = function(block) {
  var porta = block.getFieldValue('PORTA') || 'PORTA_SERIAL_3';
  var btVar = brickEnsureBluetoothForPort(porta);

  var code = '(char)(' + btVar + '.read())';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
