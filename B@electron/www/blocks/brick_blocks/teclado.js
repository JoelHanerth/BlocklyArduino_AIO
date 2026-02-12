/**
 * @fileoverview Blocos para o Teclado do Brick
 */
'use strict';

goog.provide('Blockly.Blocks.teclado');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

Blockly.Blocks.teclado = Blockly.Blocks.teclado || {};
Blockly.Blocks.teclado.HUE = "#4CAF50";

// Lê o estado de um botão do teclado (apertado/liberado)
Blockly.Blocks['brick_teclado_le_botao'] = {
  init: function() {
    this.setColour(Blockly.Blocks.teclado.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField('⌨️ Teclado')
        .appendField('porta')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'PORTA_I2C_1'],
          ['2', 'PORTA_I2C_2'],
          ['3', 'PORTA_I2C_3'],
          ['4', 'PORTA_I2C_4'],
          ['5', 'PORTA_I2C_5']
        ]), 'PORTA')
        .appendField('botão')
        .appendField(new Blockly.FieldDropdown([
          ['1', '1'],
          ['2', '2'],
          ['3', '3'],
          ['4', '4']
        ]), 'BOTAO')
        .appendField('apertado?');
    this.setOutput(true, 'Boolean');
    this.setTooltip('Retorna verdadeiro se o botão escolhido do teclado estiver APERTADO.');
  }
};

// Liga/desliga um LED do teclado
Blockly.Blocks['brick_teclado_altera_led'] = {
  init: function() {
    this.setColour(Blockly.Blocks.teclado.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField('⌨️ Teclado')
        .appendField('porta')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'PORTA_I2C_1'],
          ['2', 'PORTA_I2C_2'],
          ['3', 'PORTA_I2C_3'],
          ['4', 'PORTA_I2C_4'],
          ['5', 'PORTA_I2C_5']
        ]), 'PORTA')
        .appendField('LED')
        .appendField(new Blockly.FieldDropdown([
          ['1', '1'],
          ['2', '2'],
          ['3', '3'],
          ['4', '4']
        ]), 'LED')
        .appendField('estado')
        .appendField(new Blockly.FieldDropdown([
          ['ligar', 'TRUE'],
          ['desligar', 'FALSE']
        ]), 'ESTADO');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Liga ou desliga um dos LEDs do teclado (1 a 4).');
  }
};

// Tipagem dos blocos de teclado
if (Blockly.Types) {
  Blockly.Types.setBlockType('brick_teclado_le_botao', Blockly.Types.BOOLEAN);
  Blockly.Types.setBlockType('brick_teclado_altera_led', Blockly.Types.NULL);
}
