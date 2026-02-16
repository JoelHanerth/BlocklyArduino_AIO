/**
 * @fileoverview Blocos de Bluetooth do Brick
 */
'use strict';

goog.provide('Blockly.Blocks.bluetooth');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

// Cor base para a categoria Bluetooth (similar à de comunicação)
Blockly.Blocks.bluetooth = Blockly.Blocks.bluetooth || {};
Blockly.Blocks.bluetooth.HUE = 210;

// Enviar dados por Bluetooth
Blockly.Blocks['brick_bluetooth_enviar'] = {
  init: function() {
    this.setColour(Blockly.Blocks.bluetooth.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField('📶 Bluetooth')
        .appendField('porta')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'PORTA_SERIAL_1'],
          ['2', 'PORTA_SERIAL_2'],
          ['3', 'PORTA_SERIAL_3'],
          ['4', 'PORTA_SERIAL_4'],
          ['5', 'PORTA_SERIAL_5']
        ]), 'PORTA')
        .appendField('modo')
        .appendField(new Blockly.FieldDropdown([
          ['sem nova linha', 'PRINT'],
          ['com nova linha', 'PRINTLN']
        ]), 'MODO');
    this.appendValueInput('TEXTO')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField('enviar');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Envia texto ou número pela porta Bluetooth escolhida.');
  }
};

// Verificar se há dados disponíveis no Bluetooth
Blockly.Blocks['brick_bluetooth_disponivel'] = {
  init: function() {
    this.setColour(Blockly.Blocks.bluetooth.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField('📶 Bluetooth')
        .appendField('porta')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'PORTA_SERIAL_1'],
          ['2', 'PORTA_SERIAL_2'],
          ['3', 'PORTA_SERIAL_3'],
          ['4', 'PORTA_SERIAL_4'],
          ['5', 'PORTA_SERIAL_5']
        ]), 'PORTA')
        .appendField('tem dados disponíveis?');
    this.setOutput(true, 'Boolean');
    this.setTooltip('Retorna verdadeiro se houver dados disponíveis para leitura no módulo Bluetooth.');
  }
};

// Ler um caractere do Bluetooth
Blockly.Blocks['brick_bluetooth_ler_char'] = {
  init: function() {
    this.setColour(Blockly.Blocks.bluetooth.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField('📶 Bluetooth')
        .appendField('porta')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'PORTA_SERIAL_1'],
          ['2', 'PORTA_SERIAL_2'],
          ['3', 'PORTA_SERIAL_3'],
          ['4', 'PORTA_SERIAL_4'],
          ['5', 'PORTA_SERIAL_5']
        ]), 'PORTA')
        .appendField('ler caractere');
    this.setOutput(true, 'Number');
    this.setTooltip('Lê um caractere recebido via Bluetooth (retorna o código do caractere).');
  }
};

// Tipagem dos blocos Bluetooth
Blockly.Blocks['brick_bluetooth_disponivel'].getBlockType = function() {
  return Blockly.Types.BOOLEAN;
};

Blockly.Blocks['brick_bluetooth_ler_char'].getBlockType = function() {
  return Blockly.Types.NUMBER;
};
