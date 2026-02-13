'use strict';

goog.provide('Blockly.Blocks.tela');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

Blockly.Blocks.tela = Blockly.Blocks.tela || {};
// cor parecida com FF6680
Blockly.Blocks.tela.HUE = "#00897B";

// =============================
// Blocos de Tela (SSD1306)
// =============================

// Imprimir na tela OLED em uma porta I2C escolhida
Blockly.Blocks['brick_tela_print'] = {
  init: function() {
    this.setColour(Blockly.Blocks.tela.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField('tela na porta I2C')
        .appendField(new Blockly.FieldDropdown([
          ['1', '1'],
          ['2', '2'],
          ['3', '3'],
          ['4', '4'],
          ['5', '5']
        ]), 'PORTA');
    this.appendValueInput('TEXTO')
        .setCheck(null)
        .appendField('imprimir na tela');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Imprime um texto na tela OLED na porta I2C escolhida.');
  }
};

// Limpar a tela OLED
Blockly.Blocks['brick_tela_clear'] = {
  init: function() {
    this.setColour(Blockly.Blocks.tela.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField('limpar tela na porta I2C')
        .appendField(new Blockly.FieldDropdown([
          ['1', '1'],
          ['2', '2'],
          ['3', '3'],
          ['4', '4'],
          ['5', '5']
        ]), 'PORTA');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Limpa o conteúdo da tela OLED na porta I2C escolhida.');
  }
};

// Mudar o tamanho da fonte da tela
Blockly.Blocks['brick_tela_set_fonte'] = {
  init: function() {
    this.setColour(Blockly.Blocks.tela.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField('tamanho da fonte na porta I2C')
        .appendField(new Blockly.FieldDropdown([
          ['1', '1'],
          ['2', '2'],
          ['3', '3'],
          ['4', '4'],
          ['5', '5']
        ]), 'PORTA')
        .appendField('tamanho')
        .appendField(new Blockly.FieldDropdown([
          ['pequena', 'PEQUENA'],
          ['média', 'MEDIA'],
          ['grande', 'GRANDE']
        ]), 'TAMANHO');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Define o tamanho da fonte na tela OLED.');
  }
};

// Definir posição do cursor na tela
Blockly.Blocks['brick_tela_set_cursor'] = {
  init: function() {
    this.setColour(Blockly.Blocks.tela.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField('tela na porta I2C')
        .appendField(new Blockly.FieldDropdown([
          ['1', '1'],
          ['2', '2'],
          ['3', '3'],
          ['4', '4'],
          ['5', '5']
        ]), 'PORTA');
    this.appendValueInput('COLUNA')
        .setCheck('Number')
        .appendField('cursor coluna');
    this.appendValueInput('LINHA')
        .setCheck('Number')
        .appendField('linha');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Define a posição do cursor na tela na porta I2C escolhida.');
  }
};

// Enviar apenas retorno de carro ("\r") para a tela
Blockly.Blocks['brick_tela_ret_carro'] = {
  init: function() {
    this.setColour(Blockly.Blocks.tela.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField('tela na porta I2C')
        .appendField(new Blockly.FieldDropdown([
          ['1', '1'],
          ['2', '2'],
          ['3', '3'],
          ['4', '4'],
          ['5', '5']
        ]), 'PORTA')
        .appendField('reiniciar linha (\\r)');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Envia apenas "\\r" (retorno de carro) para a tela na porta escolhida.');
  }
};
