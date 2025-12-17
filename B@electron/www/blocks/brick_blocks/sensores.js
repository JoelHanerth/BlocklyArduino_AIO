/**
 * @fileoverview Blocos para sensores do Brick
 */
'use strict';

goog.provide('Blockly.Blocks.brick_sensores');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

Blockly.Blocks.brick_sensores = Blockly.Blocks.brick_sensores || {};
Blockly.Blocks.brick_sensores.HUE = "#00A8C9";

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
		.appendField('🎨')
        .appendField('porta')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'PORTA_I2C_1'],
          ['2', 'PORTA_I2C_2'],
          ['3', 'PORTA_I2C_3'],
          ['4', 'PORTA_I2C_4'],
          ['5', 'PORTA_I2C_5']
        ]), 'PORTA')
        .appendField('é a cor')
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
		.appendField('🎨')
        .appendField('porta')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'PORTA_I2C_1'],
          ['2', 'PORTA_I2C_2'],
          ['3', 'PORTA_I2C_3'],
          ['4', 'PORTA_I2C_4'],
          ['5', 'PORTA_I2C_5']
        ]), 'PORTA')
        .appendField('cor');
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
		.appendField('🎨')
        .appendField('porta')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'PORTA_I2C_1'],
          ['2', 'PORTA_I2C_2'],
          ['3', 'PORTA_I2C_3'],
          ['4', 'PORTA_I2C_4'],
          ['5', 'PORTA_I2C_5']
        ]), 'PORTA')
        .appendField('ler')
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
		.appendField('🎨 Calibrar sensor')
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

// Lê a distância do sensor VL53L0X em uma porta I2C escolhida, em cm ou mm
Blockly.Blocks['brick_sensor_vl53l0x_distancia'] = {
  init: function() {
    this.setColour(Blockly.Blocks.brick_sensores.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField('📏 porta')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'PORTA_I2C_1'],
          ['2', 'PORTA_I2C_2'],
          ['3', 'PORTA_I2C_3'],
          ['4', 'PORTA_I2C_4'],
          ['5', 'PORTA_I2C_5']
        ]), 'PORTA')
        .appendField('distância em')
        .appendField(new Blockly.FieldDropdown([
          ['cm', 'CM'],
          ['mm', 'MM']
        ]), 'UNID');
    this.setOutput(true, 'Number');
    this.setTooltip('Lê a distância na unidade escolhida (cm ou mm) do sensor VL53L0X conectado na porta I2C escolhida.');
  }
};

// Compara a distância do VL53L0X com um valor em cm ou mm
Blockly.Blocks['brick_sensor_vl53l0x_compara'] = {
  init: function() {
    this.setColour(Blockly.Blocks.brick_sensores.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
    .appendField('📏 porta')
    .appendField(new Blockly.FieldDropdown([
      ['1', 'PORTA_I2C_1'],
      ['2', 'PORTA_I2C_2'],
      ['3', 'PORTA_I2C_3'],
      ['4', 'PORTA_I2C_4'],
      ['5', 'PORTA_I2C_5']
    ]), 'PORTA')
        .appendField(new Blockly.FieldDropdown([
          ['é mais perto que', 'MENOR'],
          ['é igual a', 'IGUAL'],
          ['é mais longe que', 'MAIOR']
        ]), 'COND');
    this.appendValueInput('VALOR')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput()
		.appendField(new Blockly.FieldDropdown([
		  ['cm', 'CM'],
		  ['mm', 'MM']
		]), 'UNID');
    this.setOutput(true, 'Boolean');
    this.setTooltip('Retorna verdadeiro se a distância medida pelo VL53L0X for mais perto, igual ou mais longe que o valor informado, na unidade escolhida (cm ou mm).');
  }
};
