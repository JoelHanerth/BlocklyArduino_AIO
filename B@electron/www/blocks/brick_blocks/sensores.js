/**
 * @fileoverview Blocos para sensores do Brick
 */
'use strict';

goog.provide('Blockly.Blocks.brick_sensores');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

Blockly.Blocks.brick_sensores = Blockly.Blocks.brick_sensores || {};
Blockly.Blocks.brick_sensores.HUE = 260;

// Cria e registra um sensor de cor em uma porta escolhida
Blockly.Blocks['brick_sensor_tcs34725_criar'] = {
  init: function() {
    this.setColour(Blockly.Blocks.brick_sensores.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
		.appendField('🎨 Usar sensor de cor na ')
        .appendField('porta')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'PORTA_I2C_1'],
          ['2', 'PORTA_I2C_2'],
          ['3', 'PORTA_I2C_3'],
          ['4', 'PORTA_I2C_4'],
          ['5', 'PORTA_I2C_5']
        ]), 'PORTA');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Prepara o sensor de cor na porta escolhida para ser usado com o Brick.');
  }
};

// Verifica se o sensor de cor está vendo a cor escolhida
Blockly.Blocks['brick_sensor_tcs34725_eh_cor'] = {
  init: function() {
    this.setColour(Blockly.Blocks.brick_sensores.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
		.appendField('🎨 Sensor de cor na')
        .appendField('porta')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'PORTA_I2C_1'],
          ['2', 'PORTA_I2C_2'],
          ['3', 'PORTA_I2C_3'],
          ['4', 'PORTA_I2C_4'],
          ['5', 'PORTA_I2C_5']
        ]), 'PORTA')
        .appendField('está vendo a cor')
        .appendField(new Blockly.FieldDropdown([
          ['⬛ preto', 'COR_PRETO'],
          ['⬜ branco', 'COR_BRANCO'],
          ['🟥 vermelho', 'COR_VERMELHO'],
          ['🟩 verde', 'COR_VERDE'],
          ['🟦 azul', 'COR_AZUL'],
          ['🟨 amarelo', 'COR_AMARELO']
        ]), 'COR');
    this.setOutput(true, 'Boolean');
    this.setTooltip('Retorna verdadeiro se o sensor de cor dessa porta estiver vendo a cor escolhida.');
  }
};

// Retorna a cor detectada pelo sensor (como um número que representa uma cor básica)
Blockly.Blocks['brick_sensor_tcs34725_cor'] = {
  init: function() {
    this.setColour(Blockly.Blocks.brick_sensores.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
		.appendField('🎨 Cor que o sensor vê na')
        .appendField('porta')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'PORTA_I2C_1'],
          ['2', 'PORTA_I2C_2'],
          ['3', 'PORTA_I2C_3'],
          ['4', 'PORTA_I2C_4'],
          ['5', 'PORTA_I2C_5']
        ]), 'PORTA');
      this.setOutput(true, 'Number');
      this.setTooltip('Retorna a cor básica que o sensor está vendo (preto, branco, vermelho, verde, azul, amarelo).');
  }
};

// Lê um valor (R, G, B ou C) de um sensor de cor escolhido
Blockly.Blocks['brick_sensor_tcs34725_ler'] = {
  init: function() {
    this.setColour(Blockly.Blocks.brick_sensores.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
		.appendField('🎨 Ler cor do sensor na')
        .appendField('porta')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'PORTA_I2C_1'],
          ['2', 'PORTA_I2C_2'],
          ['3', 'PORTA_I2C_3'],
          ['4', 'PORTA_I2C_4'],
          ['5', 'PORTA_I2C_5']
        ]), 'PORTA')
        .appendField('componente')
        .appendField(new Blockly.FieldDropdown([
          ['vermelho (R)', 'R'],
          ['verde (G)', 'G'],
          ['azul (B)', 'B'],
          ['claro (C)', 'C']
        ]), 'COMP');
    this.setOutput(true, 'Number');
    this.setTooltip('Lê apenas um dos valores do sensor de cor (vermelho, verde, azul ou luz).');
  }
};

// Calibra o sensor de cor na porta escolhida
Blockly.Blocks['brick_sensor_tcs34725_calibrar'] = {
  init: function() {
    this.setColour(Blockly.Blocks.brick_sensores.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
		.appendField('🎨 Calibrar sensor de cor na')
        .appendField('porta')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'PORTA_I2C_1'],
          ['2', 'PORTA_I2C_2'],
          ['3', 'PORTA_I2C_3'],
          ['4', 'PORTA_I2C_4'],
          ['5', 'PORTA_I2C_5']
        ]), 'PORTA');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Grava a calibração do sensor de cor dessa porta na memória do Brick.');
  }
};

// Controla a cor de um LED da fita (ou todos)
Blockly.Blocks['brick_led_cor'] = {
  init: function() {
    this.setColour(Blockly.Blocks.brick_sensores.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
		.appendField('💡 LED')
        .appendField(new Blockly.FieldDropdown([
          ['todos', '255'],
          ['1', '1'],
          ['2', '2'],
          ['3', '3'],
          ['4', '4'],
          ['5', '5'],
          ['6', '6'],
          ['7', '7'],
          ['8', '8'],
          ['9', '9'],
          ['10', '10']
        ]), 'LED')
        .appendField('cor')
        .appendField(new Blockly.FieldDropdown([
          ['vermelho', 'VERMELHO'],
          ['verde', 'VERDE'],
          ['azul', 'AZUL'],
          ['branco', 'BRANCO'],
          ['amarelo', 'AMARELO'],
          ['ciano', 'CIANO'],
          ['magenta', 'MAGENTA']
        ]), 'COR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Liga o(s) LED(s) da fita na cor escolhida. A opção "todos" altera todos os LEDs.');
  }
};

// Apaga um LED da fita (ou todos)
Blockly.Blocks['brick_led_apagar'] = {
  init: function() {
    this.setColour(Blockly.Blocks.brick_sensores.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
		.appendField('💡 Apagar LED')
        .appendField(new Blockly.FieldDropdown([
          ['todos', '255'],
          ['1', '1'],
          ['2', '2'],
          ['3', '3'],
          ['4', '4'],
          ['5', '5'],
          ['6', '6'],
          ['7', '7'],
          ['8', '8'],
          ['9', '9'],
          ['10', '10']
        ]), 'LED');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Apaga o LED escolhido ou todos os LEDs da fita.');
  }
};

// Inicializa a fita de LED na porta e quantidade desejada
Blockly.Blocks['brick_led_inicializa'] = {
  init: function() {
    this.setColour(Blockly.Blocks.brick_sensores.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
		.appendField('💡 Usar LEDs na')
        .appendField('porta')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'PORTA_LED_1'],
          ['2', 'PORTA_LED_2'],
          ['3', 'PORTA_LED_3'],
          ['4', 'PORTA_LED_4']
        ]), 'PORTA')
        .appendField('com')
        .appendField(new Blockly.FieldDropdown([
          ['1 LED', '1'],
          ['2 LEDs', '2'],
          ['3 LEDs', '3'],
          ['4 LEDs', '4'],
          ['5 LEDs', '5'],
          ['6 LEDs', '6'],
          ['7 LEDs', '7'],
          ['8 LEDs', '8'],
          ['9 LEDs', '9'],
          ['10 LEDs', '10']
        ]), 'QTD');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Inicializa a fita de LEDs na porta escolhida com a quantidade de LEDs que você está usando (1 a 10).');
  }
};

// Efeitos especiais de luz na fita de LED
Blockly.Blocks['brick_led_efeitos'] = {
  init: function() {
    this.setColour(Blockly.Blocks.brick_sensores.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
		.appendField('💡 Luzes especiais:')
        .appendField(new Blockly.FieldDropdown([
          ['arco-íris parado', 'ARCOIRIS'],
          ['arco-íris girando', 'ARCOIRIS_ROT'],
          ['Knight Rider', 'KNIGHT'],
          ['preencher LEDs', 'PREENCHIMENTO'],
          ['piscar', 'PISCAR'],
          ['fade (aparecer/desaparecer)', 'FADE'],
          ['teatro (correr luzes)', 'TEATRO'],
          ['faíscas (sparkle)', 'SPARKLE'],
          ['onda de luz', 'ONDA']
        ]), 'EFEITO');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Roda um efeito especial de luz na fita de LEDs (use depois de inicializar a fita).');
  }
};

