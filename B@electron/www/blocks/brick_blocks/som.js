/**
 * @fileoverview Blocos de som (buzzer) do Brick
 */
'use strict';

goog.provide('Blockly.Blocks.som');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

// Cor base para a categoria Som (compatível com a categoria CAT_BRICK_SOUND)
Blockly.Blocks.som = Blockly.Blocks.som || {};
Blockly.Blocks.som.HUE = 10;

// Toca um beep em um buzzer em uma das portas do Brick
Blockly.Blocks['brick_buzzer_beep'] = {
  init: function() {
    this.setColour(Blockly.Blocks.som.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField('🔔')
        .appendField('porta')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'PORTA_BUZZER_1'],
          ['2', 'PORTA_BUZZER_2'],
          ['3', 'PORTA_BUZZER_3'],
          ['4', 'PORTA_BUZZER_4']
        ]), 'PORTA');
    this.appendValueInput('FREQ')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField('frequência (Hz)');
    this.appendValueInput('DUR')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField('duração (ms)');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Toca um beep no buzzer da porta escolhida, na frequência (Hz) e duração (ms) informadas.');
  }
};

// Inicia uma melodia pronta (como Jingle Bells ou Power Rangers)
Blockly.Blocks['brick_buzzer_iniciar_som'] = {
  init: function() {
    this.setColour(Blockly.Blocks.som.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField('🔔 Iniciar som')
        .appendField('na porta')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'PORTA_BUZZER_1'],
          ['2', 'PORTA_BUZZER_2'],
          ['3', 'PORTA_BUZZER_3'],
          ['4', 'PORTA_BUZZER_4']
        ]), 'PORTA')
        .appendField('melodia')
        .appendField(new Blockly.FieldDropdown([
          ['Jingle Bells', 'JINGLE'],
          ['Power Rangers', 'POWER_RANGERS']
        ]), 'MELODIA');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Toca uma melodia pronta no buzzer da porta escolhida (Jingle Bells ou tema dos Power Rangers).');
  }
};

// Inicia um efeito sonoro curto (alerta, sucesso, erro)
Blockly.Blocks['brick_buzzer_iniciar_efeito'] = {
  init: function() {
    this.setColour(Blockly.Blocks.som.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField('🔔 Iniciar efeito')
        .appendField('na porta')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'PORTA_BUZZER_1'],
          ['2', 'PORTA_BUZZER_2'],
          ['3', 'PORTA_BUZZER_3'],
          ['4', 'PORTA_BUZZER_4']
        ]), 'PORTA')
        .appendField('tipo')
        .appendField(new Blockly.FieldDropdown([
          ['alerta', 'ALERTA'],
          ['sucesso', 'SUCESSO'],
          ['erro', 'ERRO']
        ]), 'EFEITO');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Toca um efeito rápido no buzzer (alerta, sucesso ou erro) na porta escolhida.');
  }
};

// Para o som no buzzer da porta escolhida
Blockly.Blocks['brick_buzzer_parar'] = {
  init: function() {
    this.setColour(Blockly.Blocks.som.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField('🔔 Parar som')
        .appendField('na porta')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'PORTA_BUZZER_1'],
          ['2', 'PORTA_BUZZER_2'],
          ['3', 'PORTA_BUZZER_3'],
          ['4', 'PORTA_BUZZER_4']
        ]), 'PORTA');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Para o som do buzzer nessa porta (chama parar()).');
  }
};
