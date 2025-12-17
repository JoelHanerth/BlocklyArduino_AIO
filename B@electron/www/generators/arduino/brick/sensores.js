/**
 * @fileoverview Geradores de código para sensores do Brick
 */
'use strict';

goog.provide('Blockly.Arduino.brick_sensores');

goog.require('Blockly.Arduino');

// TCS34725 em uma porta I2C escolhida, registrado no Brick
Blockly.Arduino['brick_sensor_tcs34725_criar'] = function(block) {
    Blockly.Arduino.includes_['include_brick_simples'] = '#include <brickSimples.h>';

    var porta = block.getFieldValue('PORTA') || 'PORTA_I2C_1';

    var varName = 'sensorTCS_' + porta.toLowerCase();

    Blockly.Arduino.definitions_['tcs34725_' + porta.toLowerCase()] =
        'TCS34725 ' + varName + ' = TCS34725(' + porta + ');';

    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
    Blockly.Arduino.setups_['setup_brick_tcs34725_' + porta.toLowerCase()] =
        'brick.adiciona(' + varName + ');';

    return '';
};

// Verifica se o sensor de cor está vendo a cor escolhida (retorna booleano)
Blockly.Arduino['brick_sensor_tcs34725_eh_cor'] = function(block) {
  Blockly.Arduino.includes_['include_brick_simples'] = '#include <brickSimples.h>';

  var porta = block.getFieldValue('PORTA') || 'PORTA_I2C_1';
  var cor = block.getFieldValue('COR') || 'COR_VERMELHO';

  var varName = 'sensorTCS_' + porta.toLowerCase();

  Blockly.Arduino.definitions_['tcs34725_' + porta.toLowerCase()] =
    'TCS34725 ' + varName + ' = TCS34725(' + porta + ');';

  Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
  Blockly.Arduino.setups_['setup_brick_tcs34725_' + porta.toLowerCase()] =
    'brick.adiciona(' + varName + ');';

  var code = varName + '.ehCor(TCS34725::' + cor + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// Retorna a cor detectada pelo sensor (enum CorBasica convertido em número)
Blockly.Arduino['brick_sensor_tcs34725_cor'] = function(block) {

  Blockly.Arduino.includes_['include_brick_simples'] = '#include <brickSimples.h>';

  var porta = block.getFieldValue('PORTA') || 'PORTA_I2C_1';

  var varName = 'sensorTCS_' + porta.toLowerCase();

  Blockly.Arduino.definitions_['tcs34725_' + porta.toLowerCase()] =
    'TCS34725 ' + varName + ' = TCS34725(' + porta + ');';

    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
  Blockly.Arduino.setups_['setup_brick_tcs34725_' + porta.toLowerCase()] =
    'brick.adiciona(' + varName + ');';

  var code = varName + '.detectaCorBasica()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// Lê um valor único (R, G, B ou C) de um sensor de cor em uma porta escolhida
Blockly.Arduino['brick_sensor_tcs34725_ler'] = function(block) {
  Blockly.Arduino.includes_['include_brick_simples'] = '#include <brickSimples.h>';

  var porta = block.getFieldValue('PORTA') || 'PORTA_I2C_1';
  var componente = block.getFieldValue('COMP') || 'R';

  var varName = 'sensorTCS_' + porta.toLowerCase();

  Blockly.Arduino.definitions_['tcs34725_' + porta.toLowerCase()] =
    'TCS34725 ' + varName + ' = TCS34725(' + porta + ');';

    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
  Blockly.Arduino.setups_['setup_brick_tcs34725_' + porta.toLowerCase()] =
    'brick.adiciona(' + varName + ');';

  var metodo;
  if (componente === 'R') {
    metodo = 'getR()';
  } else if (componente === 'G') {
    metodo = 'getG()';
  } else if (componente === 'B') {
    metodo = 'getB()';
  } else {
    metodo = 'getC()';
  }

  var code = varName + '.' + metodo;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// Calibra o sensor de cor na porta escolhida
Blockly.Arduino['brick_sensor_tcs34725_calibrar'] = function(block) {
  Blockly.Arduino.includes_['include_brick_simples'] = '#include <brickSimples.h>';

  var porta = block.getFieldValue('PORTA') || 'PORTA_I2C_1';

  var varName = 'sensorTCS_' + porta.toLowerCase();

  Blockly.Arduino.definitions_['tcs34725_' + porta.toLowerCase()] =
    'TCS34725 ' + varName + ' = TCS34725(' + porta + ');';

  Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
  Blockly.Arduino.setups_['setup_brick_tcs34725_' + porta.toLowerCase()] =
    'brick.adiciona(' + varName + ');';

  Blockly.Arduino.setups_['setup_brick_tcs34725_calibrar_' + porta.toLowerCase()] =
    varName + '.calibrar();';

  return '';
};

// Lê a distância do sensor VL53L0X em uma porta I2C escolhida (cm ou mm)
Blockly.Arduino['brick_sensor_vl53l0x_distancia'] = function(block) {
  Blockly.Arduino.includes_['include_brick_simples'] = '#include <brickSimples.h>';

  var porta = block.getFieldValue('PORTA') || 'PORTA_I2C_1';
  var unid = block.getFieldValue('UNID') || 'MM';

  var varName = 'sensorVL53_' + porta.toLowerCase();

  // Cria o objeto VL53L0X para essa porta
  Blockly.Arduino.definitions_['vl53l0x_' + porta.toLowerCase()] =
    'VL53L0X ' + varName + ' = VL53L0X(' + porta + ');';

  // Garante inicialização do Brick e registro do sensor
  Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
  Blockly.Arduino.setups_['setup_brick_vl53l0x_' + porta.toLowerCase()] =
    'brick.adiciona(' + varName + ');';

  var code;
  if (unid === 'CM') {
    // getDistancia() retorna em milímetros; converte para centímetros
    code = '(' + varName + '.getDistancia() / 10.0)';
  } else {
    // padrão: milímetros
    code = varName + '.getDistancia()';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// Compara a distância do VL53L0X com um valor em cm ou mm
Blockly.Arduino['brick_sensor_vl53l0x_compara'] = function(block) {
  Blockly.Arduino.includes_['include_brick_simples'] = '#include <brickSimples.h>';

  var porta = block.getFieldValue('PORTA') || 'PORTA_I2C_1';
  var cond = block.getFieldValue('COND') || 'MENOR';
  var unid = block.getFieldValue('UNID') || 'CM';

  var varName = 'sensorVL53_' + porta.toLowerCase();

  // Garante que o objeto VL53L0X para essa porta exista
  Blockly.Arduino.definitions_['vl53l0x_' + porta.toLowerCase()] =
    'VL53L0X ' + varName + ' = VL53L0X(' + porta + ');';

  // Garante inicialização do Brick e registro do sensor
  Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
  Blockly.Arduino.setups_['setup_brick_vl53l0x_' + porta.toLowerCase()] =
    'brick.adiciona(' + varName + ');';

  var valor = Blockly.Arduino.valueToCode(block, 'VALOR', Blockly.Arduino.ORDER_MULTIPLICATIVE) || '0';
  var valorMm;
  if (unid === 'CM') {
    // valor informado está em centímetros, converte para milímetros
    valorMm = '(' + valor + ' * 10)';
  } else {
    // valor já está em milímetros
    valorMm = '(' + valor + ')';
  }

  var dist = varName + '.getDistancia()';
  var code;
  if (cond === 'MENOR') {
    code = dist + ' < ' + valorMm;
  } else if (cond === 'MAIOR') {
    code = dist + ' > ' + valorMm;
  } else { // IGUAL
    code = dist + ' == ' + valorMm;
  }

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
