/**
 * @fileoverview Bloco para atualização do Brick
 */
'use strict';

goog.provide('Blockly.Blocks.brick');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

Blockly.Blocks.brick = Blockly.Blocks.brick || {};
// cor parecida com FF6680
Blockly.Blocks.brick.HUE = "#FF6680";

Blockly.Blocks['brick_atualizabrick'] = {
  init: function() {
    this.setColour(Blockly.Blocks.brick.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField("Atualiza Brick");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("Chama brick.atualiza(); para atualizar o Brick");
  }
};

// Imprime um valor no terminal serial (com ou sem quebra de linha)
Blockly.Blocks['brick_imprimir_terminal'] = {
  init: function() {
    this.setColour(Blockly.Blocks.brick.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField('Imprimir no terminal')
        .appendField(new Blockly.FieldDropdown([
          ['sem pular linha', 'PRINT'],
          ['pular linha', 'PRINTLN']
        ]), 'MODO');
    this.appendValueInput('TEXTO')
        .setCheck(null)
        .appendField('valor');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Envia o valor para o Monitor Serial, com ou sem pular linha.');
  }
};

// Verifica se o botão do Brick está pressionado
Blockly.Blocks['brick_botao_apertado'] = {
  init: function() {
    this.setColour(Blockly.Blocks.brick.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField('botão do Brick está pressionado?');
    this.setOutput(true, 'Boolean');
    this.setTooltip('Retorna verdadeiro se o botão do Brick estiver pressionado (usa brick.botaoApertado()).');
  }
};

// Aguarda até que o botão do Brick seja pressionado
Blockly.Blocks['brick_aguarde_botao_apertado'] = {
  init: function() {
    this.setColour(Blockly.Blocks.brick.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField('aguarde até o botão do Brick ser pressionado');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Fica esperando até que o botão do Brick seja pressionado (usa brick.botaoApertado()).');
  }
};
