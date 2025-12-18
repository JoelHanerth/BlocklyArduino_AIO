///

///
'use strict';

goog.provide('Blockly.Blocks.led');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

// Mesma família de cor da categoria CAT_BRICK_LED (#FF6680)
Blockly.Blocks.led.HUE = "#9B6AF6";



// Inicializa a fita de LED na porta e quantidade desejada
Blockly.Blocks['brick_ledstrip_criar'] = {
  init: function() {
    this.setColour(Blockly.Blocks.led.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
		.appendField('💡')
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

// Controla a cor de um LED da fita (ou todos)
Blockly.Blocks['brick_led_cor'] = {
  init: function() {
    this.setColour(Blockly.Blocks.led.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField('💡')
        .appendField('porta')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'PORTA_LED_1'],
          ['2', 'PORTA_LED_2'],
          ['3', 'PORTA_LED_3'],
          ['4', 'PORTA_LED_4']
        ]), 'PORTA')
		.appendField('LED')
        .appendField(new Blockly.FieldDropdown([
          ['todos', '255'],
      ['1', 'LED_1'],
      ['2', 'LED_2'],
      ['3', 'LED_3'],
      ['4', 'LED_4'],
      ['5', 'LED_5'],
      ['6', 'LED_6'],
      ['7', 'LED_7'],
      ['8', 'LED_8'],
      ['9', 'LED_9'],
      ['10', 'LED_10']
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

// Define a cor RGB de um LED da fita (ou todos)
Blockly.Blocks['brick_led_rgb'] = {
  init: function() {
    this.setColour(Blockly.Blocks.led.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField('💡')
        .appendField('porta')
		.appendField(new Blockly.FieldDropdown([
		  ['1', 'PORTA_LED_1'],
		  ['2', 'PORTA_LED_2'],
		  ['3', 'PORTA_LED_3'],
		  ['4', 'PORTA_LED_4']
		]), 'PORTA')
        .appendField('LED')
        .appendField(new Blockly.FieldDropdown([
          ['todos', '255'],
          ['1', 'LED_1'],
          ['2', 'LED_2'],
          ['3', 'LED_3'],
          ['4', 'LED_4'],
          ['5', 'LED_5'],
          ['6', 'LED_6'],
          ['7', 'LED_7'],
          ['8', 'LED_8'],
          ['9', 'LED_9'],
          ['10', 'LED_10']
        ]), 'LED')
    this.appendValueInput('R')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField('R');
    this.appendValueInput('G')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField('G');
    this.appendValueInput('B')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField('B');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Define diretamente a cor RGB de um LED específico ou de todos os LEDs da fita.');
  }
};

// Apaga um LED da fita (ou todos)
Blockly.Blocks['brick_led_apagar'] = {
  init: function() {
    this.setColour(Blockly.Blocks.led.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField('💡Desligar LED')
        .appendField('porta')
        .appendField(new Blockly.FieldDropdown([
        ['1', 'PORTA_LED_1'],
        ['2', 'PORTA_LED_2'],
        ['3', 'PORTA_LED_3'],
        ['4', 'PORTA_LED_4']
        ]), 'PORTA')
		.appendField('LED')
        .appendField(new Blockly.FieldDropdown([
          ['todos', '255'],
      ['1', 'LED_1'],
      ['2', 'LED_2'],
      ['3', 'LED_3'],
      ['4', 'LED_4'],
      ['5', 'LED_5'],
      ['6', 'LED_6'],
      ['7', 'LED_7'],
      ['8', 'LED_8'],
      ['9', 'LED_9'],
      ['10', 'LED_10']
        ]), 'LED');
		
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Apaga o LED escolhido ou todos os LEDs da fita.');
  }
};

// Diminui o brilho de todos os LEDs da fita
Blockly.Blocks['brick_led_brilho'] = {
  init: function() {
    this.setColour(Blockly.Blocks.led.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
    .appendField('💡')
    .appendField('porta')
    .appendField(new Blockly.FieldDropdown([
      ['1', 'PORTA_LED_1'],
      ['2', 'PORTA_LED_2'],
      ['3', 'PORTA_LED_3'],
      ['4', 'PORTA_LED_4']
    ]), 'PORTA')
    .appendField('definir brilho');
    this.appendValueInput('PCT')
    .setCheck('Number')
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField('para (%)');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Define o brilho global da fita de LEDs nessa porta para o percentual indicado (0 a 100%).');
  }
};

// Efeitos especiais de luz na fita de LED
Blockly.Blocks['brick_led_efeitos'] = {
  init: function() {
    this.setColour(Blockly.Blocks.led.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
		.appendField('💡')
        .appendField('porta')
		.appendField(new Blockly.FieldDropdown([
		  ['1', 'PORTA_LED_1'],
		  ['2', 'PORTA_LED_2'],
		  ['3', 'PORTA_LED_3'],
		  ['4', 'PORTA_LED_4']
		]), 'PORTA')
        .appendField('efeito')
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

