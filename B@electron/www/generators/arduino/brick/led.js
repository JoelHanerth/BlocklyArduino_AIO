/**
 * @fileoverview Geradores de código para LEDs do Brick
 */
'use strict';

goog.provide('Blockly.Arduino.brick_led');

goog.require('Blockly.Arduino');

// LEDStrip em uma porta LED escolhida, registrado no Brick
Blockly.Arduino['brick_ledstrip_criar'] = function(block) {
    Blockly.Arduino.includes_['include_brick_simples'] =
        '#include <brickSimples.h>';

    var porta = block.getFieldValue('PORTA') || 'PORTA_LED_1';
  // "QTD" é um FieldDropdown, não uma entrada de valor, então usamos getFieldValue
  var qtd = block.getFieldValue('QTD') || '1';

    var varName;
    switch (porta) {
      case 'PORTA_LED_1':
        varName = 'led1';
        break;
      case 'PORTA_LED_2':
        varName = 'led2';
        break;
      case 'PORTA_LED_3':
        varName = 'led3';
        break;
      case 'PORTA_LED_4':
        varName = 'led4';
        break;
      default:
        varName = 'led1';
        break;
    }

    Blockly.Arduino.definitions_['ledstrip_' + porta.toLowerCase()] =
        'LEDStrip ' + varName + ' = LEDStrip(' + porta + ', ' + qtd + ');';

    Blockly.Arduino.setups_['setup_brick_simples'] =
        'brick.inicializa();';

    Blockly.Arduino.setups_['setup_brick_ledstrip_' + porta.toLowerCase()] =
        'brick.adiciona(' + varName + ');';

    return '';
};

// Controla a cor de um LED da fita (ou todos)
Blockly.Arduino['brick_led_cor'] = function(block) {
  Blockly.Arduino.includes_['include_brick_simples'] = '#include <brickSimples.h>';

  var porta = block.getFieldValue('PORTA') || 'PORTA_LED_1';
  var stripVar;
  switch (porta) {
    case 'PORTA_LED_1':
      stripVar = 'led1';
      break;
    case 'PORTA_LED_2':
      stripVar = 'led2';
      break;
    case 'PORTA_LED_3':
      stripVar = 'led3';
      break;
    case 'PORTA_LED_4':
      stripVar = 'led4';
      break;
    default:
      stripVar = 'led1';
      break;
  }

  // Garante que a fita de LED dessa porta esteja instanciada e registrada no Brick
  var defKey = 'ledstrip_' + porta.toLowerCase();
  if (!Blockly.Arduino.definitions_[defKey]) {
    Blockly.Arduino.definitions_[defKey] =
      'LEDStrip ' + stripVar + ' = LEDStrip(' + porta + ');';

    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
    Blockly.Arduino.setups_['setup_brick_ledstrip_' + porta.toLowerCase()] =
      'brick.adiciona(' + stripVar + ');';
  }

  var led = block.getFieldValue('LED') || '255';
  var cor = block.getFieldValue('COR') || 'VERMELHO';

  var indice;
  if (led === '255') {
    indice = '255';
  } else {
    // Usa diretamente os defines LED_1..LED_10
    indice = led;
  }

  var code = '';

  switch (cor) {
    case 'VERMELHO':
      code = stripVar + '.vermelho(' + indice + ');\n' + stripVar + '.atualiza();\n';
      break;
    case 'VERDE':
      code = stripVar + '.verde(' + indice + ');\n' + stripVar + '.atualiza();\n';
      break;
    case 'AZUL':
      code = stripVar + '.azul(' + indice + ');\n' + stripVar + '.atualiza();\n';
      break;
    case 'BRANCO':
      code = stripVar + '.branco(' + indice + ');\n' + stripVar + '.atualiza();\n';
      break;
    case 'AMARELO':
      code = stripVar + '.amarelo(' + indice + ');\n' + stripVar + '.atualiza();\n';
      break;
    case 'CIANO':
      code = stripVar + '.ciano(' + indice + ');\n' + stripVar + '.atualiza();\n';
      break;
    case 'MAGENTA':
      code = stripVar + '.magenta(' + indice + ');\n' + stripVar + '.atualiza();\n';
      break;
    default:
      code = stripVar + '.vermelho(' + indice + ');\n' + stripVar + '.atualiza();\n';
      break;
  }

  return code;
};

// Define a cor RGB de um LED da fita (ou todos)
Blockly.Arduino['brick_led_rgb'] = function(block) {
  Blockly.Arduino.includes_['include_brick_simples'] = '#include <brickSimples.h>';

  var porta = block.getFieldValue('PORTA') || 'PORTA_LED_1';
  var stripVar;
  switch (porta) {
    case 'PORTA_LED_1':
      stripVar = 'led1';
      break;
    case 'PORTA_LED_2':
      stripVar = 'led2';
      break;
    case 'PORTA_LED_3':
      stripVar = 'led3';
      break;
    case 'PORTA_LED_4':
      stripVar = 'led4';
      break;
    default:
      stripVar = 'led1';
      break;
  }

  // Garante que a fita de LED dessa porta esteja instanciada e registrada no Brick
  var defKey = 'ledstrip_' + porta.toLowerCase();
  if (!Blockly.Arduino.definitions_[defKey]) {
    Blockly.Arduino.definitions_[defKey] =
      'LEDStrip ' + stripVar + ' = LEDStrip(' + porta + ');';

    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
    Blockly.Arduino.setups_['setup_brick_ledstrip_' + porta.toLowerCase()] =
      'brick.adiciona(' + stripVar + ');';
  }

  var led = block.getFieldValue('LED') || '255';

  var indice;
  if (led === '255') {
    indice = '255';
  } else {
    // Usa diretamente os defines LED_1..LED_10
    indice = led;
  }

  var r = Blockly.Arduino.valueToCode(block, 'R', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var g = Blockly.Arduino.valueToCode(block, 'G', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var b = Blockly.Arduino.valueToCode(block, 'B', Blockly.Arduino.ORDER_ATOMIC) || '0';

  var code = '';

  if (indice === '255') {
    code = stripVar + '.setTodos(' + r + ', ' + g + ', ' + b + ');\n' + stripVar + '.atualiza();\n';
  } else {
    code = stripVar + '.setLED(' + indice + ', ' + r + ', ' + g + ', ' + b + ');\n' + stripVar + '.atualiza();\n';
  }

  return code;
};

// Apaga um LED da fita (ou todos)
Blockly.Arduino['brick_led_apagar'] = function(block) {
  Blockly.Arduino.includes_['include_brick_simples'] = '#include <brickSimples.h>';

  var porta = block.getFieldValue('PORTA') || 'PORTA_LED_1';
  var stripVar;
  switch (porta) {
    case 'PORTA_LED_1':
      stripVar = 'led1';
      break;
    case 'PORTA_LED_2':
      stripVar = 'led2';
      break;
    case 'PORTA_LED_3':
      stripVar = 'led3';
      break;
    case 'PORTA_LED_4':
      stripVar = 'led4';
      break;
    default:
      stripVar = 'led1';
      break;
  }

  // Garante que a fita de LED dessa porta esteja instanciada e registrada no Brick
  var defKey = 'ledstrip_' + porta.toLowerCase();
  if (!Blockly.Arduino.definitions_[defKey]) {
    Blockly.Arduino.definitions_[defKey] =
      'LEDStrip ' + stripVar + ' = LEDStrip(' + porta + ');';

    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
    Blockly.Arduino.setups_['setup_brick_ledstrip_' + porta.toLowerCase()] =
      'brick.adiciona(' + stripVar + ');';
  }

  var led = block.getFieldValue('LED') || '255';

  var indice;
  if (led === '255') {
    indice = '255';
  } else {
    // Usa diretamente os defines LED_1..LED_10
    indice = led;
  }

  var code = '';

  if (indice === '255') {
    code = stripVar + '.limpar();\n' + stripVar + '.atualiza();\n';
  } else {
    code = stripVar + '.setLED(' + indice + ', 0, 0, 0);\n' + stripVar + '.atualiza();\n';
  }

  return code;
};

// Diminui o brilho de todos os LEDs da fita de uma porta
Blockly.Arduino['brick_led_brilho'] = function(block) {
  Blockly.Arduino.includes_['include_brick_simples'] = '#include <brickSimples.h>';

  var porta = block.getFieldValue('PORTA') || 'PORTA_LED_1';
  var stripVar;
  switch (porta) {
    case 'PORTA_LED_1':
      stripVar = 'led1';
      break;
    case 'PORTA_LED_2':
      stripVar = 'led2';
      break;
    case 'PORTA_LED_3':
      stripVar = 'led3';
      break;
    case 'PORTA_LED_4':
      stripVar = 'led4';
      break;
    default:
      stripVar = 'led1';
      break;
  }

  // Garante que a fita de LED dessa porta esteja instanciada e registrada no Brick
  var defKey = 'ledstrip_' + porta.toLowerCase();
  if (!Blockly.Arduino.definitions_[defKey]) {
    Blockly.Arduino.definitions_[defKey] =
      'LEDStrip ' + stripVar + ' = LEDStrip(' + porta + ');';

    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
    Blockly.Arduino.setups_['setup_brick_ledstrip_' + porta.toLowerCase()] =
      'brick.adiciona(' + stripVar + ');';
  }

  var pct = Blockly.Arduino.valueToCode(block, 'PCT', Blockly.Arduino.ORDER_ATOMIC) || '100';

  var code = stripVar + '.setBrilho('+ pct +');\n' +
             stripVar + '.atualiza();\n';

  return code;
};

// Roda efeitos especiais de luz na fita de LED
Blockly.Arduino['brick_led_efeitos'] = function(block) {
  Blockly.Arduino.includes_['include_brick_simples'] = '#include <brickSimples.h>';

  var porta = block.getFieldValue('PORTA') || 'PORTA_LED_1';
  var stripVar;
  switch (porta) {
    case 'PORTA_LED_1':
      stripVar = 'led1';
      break;
    case 'PORTA_LED_2':
      stripVar = 'led2';
      break;
    case 'PORTA_LED_3':
      stripVar = 'led3';
      break;
    case 'PORTA_LED_4':
      stripVar = 'led4';
      break;
    default:
      stripVar = 'led1';
      break;
  }

  // Garante que a fita de LED dessa porta esteja instanciada e registrada no Brick
  var defKey = 'ledstrip_' + porta.toLowerCase();
  if (!Blockly.Arduino.definitions_[defKey]) {
    Blockly.Arduino.definitions_[defKey] =
      'LEDStrip ' + stripVar + ' = LEDStrip(' + porta + ');';

    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
    Blockly.Arduino.setups_['setup_brick_ledstrip_' + porta.toLowerCase()] =
      'brick.adiciona(' + stripVar + ');';
  }

  var efeito = block.getFieldValue('EFEITO') || 'ARCOIRIS';

  var code = '';
  switch (efeito) {
    case 'ARCOIRIS':
      code = stripVar + '.arcoIris();\n' + stripVar + '.atualiza();\n';
      break;
    case 'ARCOIRIS_ROT':
      code = stripVar + '.arcoIrisRotativo();\n';
      break;
    case 'KNIGHT':
      code = stripVar + '.knightRider();\n';
      break;
    case 'PREENCHIMENTO':
      code = stripVar + '.preenchimento();\n';
      break;
    case 'PISCAR':
      code = stripVar + '.piscar();\n';
      break;
    case 'FADE':
      code = stripVar + '.fade();\n';
      break;
    case 'TEATRO':
      code = stripVar + '.teatro();\n';
      break;
    case 'SPARKLE':
      code = stripVar + '.sparkle();\n';
      break;
    case 'ONDA':
      code = stripVar + '.onda();\n';
      break;
    default:
      code = stripVar + '.arcoIris();\n' + stripVar + '.atualiza();\n';
      break;
  }

  return code;
};

