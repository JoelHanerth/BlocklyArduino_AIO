/**
 * @fileoverview Blocos para servos do Brick
 */
'use strict';

goog.provide('Blockly.Blocks.brick_servos');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

Blockly.Blocks.brick_servos = Blockly.Blocks.brick_servos || {};
Blockly.Blocks.brick_servos.HUE = "#FFB347"; // laranja claro, diferente de motores e LED

// Move servo para um ângulo
Blockly.Blocks['brick_servo_mover'] = {
  init: function() {
    this.setColour(Blockly.Blocks.brick_servos.HUE);
    this.setHelpUrl('');
    this.setInputsInline(true);
    this.appendDummyInput()
        .appendField('Servo porta')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'PORTA_SERVO_1'],
          ['2', 'PORTA_SERVO_2'],
          ['3', 'PORTA_SERVO_3'],
          ['4', 'PORTA_SERVO_4']
        ]), 'PORTA')
        .appendField('para ângulo');
    this.appendValueInput('ANGULO')
        .setCheck('Number');
    this.appendDummyInput()
        .appendField('°');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Move o servo da porta escolhida para o ângulo informado (0 a 180 graus).');
  }
};

// Move servo para um ângulo ao longo de um tempo em ms
Blockly.Blocks['brick_servo_mover_tempo'] = {
  init: function() {
    this.setColour(Blockly.Blocks.brick_servos.HUE);
    this.setHelpUrl('');
    this.setInputsInline(true);
    this.appendDummyInput()
        .appendField('Servo porta')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'PORTA_SERVO_1'],
          ['2', 'PORTA_SERVO_2'],
          ['3', 'PORTA_SERVO_3'],
          ['4', 'PORTA_SERVO_4']
        ]), 'PORTA')
        .appendField('para ângulo');
    this.appendValueInput('ANGULO')
        .setCheck('Number');
    this.appendDummyInput()
        .appendField('° em');
    this.appendValueInput('TEMPO')
        .setCheck('Number');
    this.appendDummyInput()
        .appendField('ms');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Move o servo da porta escolhida até o ângulo informado durante o tempo em milissegundos.');
  }
};

// Tipagem (ambos são blocos de comando, tipo NULL)
if (Blockly.Types) {
  Blockly.Blocks['brick_servo_mover'].getBlockType = function() {
    return Blockly.Types.NULL;
  };
  Blockly.Blocks['brick_servo_mover_tempo'].getBlockType = function() {
    return Blockly.Types.NULL;
  };
}
