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
        'brick.adiciona(&' + varName + ');';

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
    'brick.adiciona(&' + varName + ');';

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
    'brick.adiciona(&' + varName + ');';

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
    'brick.adiciona(&' + varName + ');';

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
    'brick.adiciona(&' + varName + ');';

  Blockly.Arduino.setups_['setup_brick_tcs34725_calibrar_' + porta.toLowerCase()] =
    varName + '.calibrar();';

  return '';
};

// Controla a cor de um LED da fita (ou todos)
Blockly.Arduino['brick_led_cor'] = function(block) {
  Blockly.Arduino.includes_['include_brick_simples'] = '#include <brickSimples.h>';

  var led = block.getFieldValue('LED') || '255';
  var cor = block.getFieldValue('COR') || 'VERMELHO';

  var indice;
  if (led === '255') {
    indice = '255';
  } else {
    var n = parseInt(led, 10) - 1;
    if (isNaN(n) || n < 0) {
      n = 0;
    }
    indice = String(n);
  }

  var code = '';

  switch (cor) {
    case 'VERMELHO':
      code = 'ledStrip.vermelho(' + indice + ');\nledStrip.atualiza();\n';
      break;
    case 'VERDE':
      code = 'ledStrip.verde(' + indice + ');\nledStrip.atualiza();\n';
      break;
    case 'AZUL':
      code = 'ledStrip.azul(' + indice + ');\nledStrip.atualiza();\n';
      break;
    case 'BRANCO':
      code = 'ledStrip.branco(' + indice + ');\nledStrip.atualiza();\n';
      break;
    case 'AMARELO':
      code = 'ledStrip.amarelo(' + indice + ');\nledStrip.atualiza();\n';
      break;
    case 'CIANO':
      code = 'ledStrip.ciano(' + indice + ');\nledStrip.atualiza();\n';
      break;
    case 'MAGENTA':
      code = 'ledStrip.magenta(' + indice + ');\nledStrip.atualiza();\n';
      break;
    default:
      code = 'ledStrip.vermelho(' + indice + ');\nledStrip.atualiza();\n';
      break;
  }

  return code;
};

// Apaga um LED da fita (ou todos)
Blockly.Arduino['brick_led_apagar'] = function(block) {
  Blockly.Arduino.includes_['include_brick_simples'] = '#include <brickSimples.h>';

  var led = block.getFieldValue('LED') || '255';

  var indice;
  if (led === '255') {
    indice = '255';
  } else {
    var n = parseInt(led, 10) - 1;
    if (isNaN(n) || n < 0) {
      n = 0;
    }
    indice = String(n);
  }

  var code = '';

  if (indice === '255') {
    code = 'ledStrip.limpar();\nledStrip.atualiza();\n';
  } else {
    code = 'ledStrip.setLED(' + indice + ', 0, 0, 0);\nledStrip.atualiza();\n';
  }

  return code;
};

// Inicializa a fita de LED em uma porta e quantidade escolhidas
Blockly.Arduino['brick_led_inicializa'] = function(block) {
  Blockly.Arduino.includes_['include_brick_simples'] = '#include <brickSimples.h>';

  var porta = block.getFieldValue('PORTA') || 'PORTA_LED_1';
  var qtd = block.getFieldValue('QTD') || '1';

  // Garante que a inicialização do Brick aconteça
  Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';

  // Inicializa a fita de LED no setup
  Blockly.Arduino.setups_['setup_brick_led_strip'] =
    'ledStrip.inicializa(' + porta + ', ' + qtd + ');';

  return '';
};

// Roda efeitos especiais de luz na fita de LED
Blockly.Arduino['brick_led_efeitos'] = function(block) {
  Blockly.Arduino.includes_['include_brick_simples'] = '#include <brickSimples.h>';

  var efeito = block.getFieldValue('EFEITO') || 'ARCOIRIS';

  var code = '';
  switch (efeito) {
    case 'ARCOIRIS':
      code = 'ledStrip.arcoIris();\nledStrip.atualiza();\n';
      break;
    case 'ARCOIRIS_ROT':
      code = 'ledStrip.arcoIrisRotativo();\n';
      break;
    case 'KNIGHT':
      code = 'ledStrip.knightRider();\n';
      break;
    case 'PREENCHIMENTO':
      code = 'ledStrip.preenchimento();\n';
      break;
    case 'PISCAR':
      code = 'ledStrip.piscar();\n';
      break;
    case 'FADE':
      code = 'ledStrip.fade();\n';
      break;
    case 'TEATRO':
      code = 'ledStrip.teatro();\n';
      break;
    case 'SPARKLE':
      code = 'ledStrip.sparkle();\n';
      break;
    case 'ONDA':
      code = 'ledStrip.onda();\n';
      break;
    default:
      code = 'ledStrip.arcoIris();\nledStrip.atualiza();\n';
      break;
  }

  return code;
};

