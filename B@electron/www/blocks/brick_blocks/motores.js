'use strict';

goog.provide('Blockly.Blocks.motores');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

Blockly.Blocks.motores.HUE = "#FF4CCD";

Blockly.Blocks['brick_potencia_motores'] = {
  init: function() {
    this.setColour(Blockly.Blocks.motores.HUE);
    this.setHelpUrl('');
    this.setInputsInline(true);
    this.appendValueInput("MOTOR1")
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Motor 1 potência");
    this.appendValueInput("MOTOR2")
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Motor 2 potência");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("Define a potência dos motores (valores de -100 a 100)");
  }
};


Blockly.Blocks['brick_parar_motores'] = {
  init: function() {
    this.setColour(Blockly.Blocks.motores.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField("Parar motores");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("Para ambos os motores (brick.pararMotores)");
  }
};

Blockly.Blocks['brick_motores_movimento'] = {
  init: function() {
    this.setColour(Blockly.Blocks.motores.HUE);
    // Linha de título
    this.appendDummyInput()
      .appendField('Definir motores de movimento:');

    // Linha do motor esquerdo
    this.appendDummyInput()
      .appendField('esquerdo')
      .appendField(new Blockly.FieldDropdown([
        ['Motor 1', 'MOTOR1'],
        ['Motor 2', 'MOTOR2']
      ]), 'ESQ')
      .appendField('direção')
      .appendField(new Blockly.FieldDropdown([
        ['normal', 'MOTOR_NORMAL'],
        ['invertido', 'MOTOR_INVERTIDO']
      ]), 'DIR_ESQ');

    // Linha do motor direito
    this.appendDummyInput()
      .appendField('direito')
      .appendField(new Blockly.FieldDropdown([
        ['Motor 2', 'MOTOR2'],
        ['Motor 1', 'MOTOR1']
      ]), 'DIR')
      .appendField('direção')
      .appendField(new Blockly.FieldDropdown([
        ['invertido', 'MOTOR_INVERTIDO'],
        ['normal', 'MOTOR_NORMAL']
      ]), 'DIR_DIR');

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Define os motores de movimento: esquerdo e direito. Não podem ser o mesmo motor.');
  },

  onchange: function(event) {
    if (
      !this.workspace ||
      this.isInFlyout ||
      event.blockId !== this.id ||
      event.type !== Blockly.Events.CHANGE
    ) {
      return;
    }

    var esq = this.getFieldValue('ESQ');
    var dir = this.getFieldValue('DIR');

    // Se ficaram iguais, ajusta o outro campo
    if (esq === dir) {
      if (event.name === 'ESQ') {
        this.setFieldValue(
          esq === 'MOTOR1' ? 'MOTOR2' : 'MOTOR1',
          'DIR'
        );
      } else if (event.name === 'DIR') {
        this.setFieldValue(
          dir === 'MOTOR1' ? 'MOTOR2' : 'MOTOR1',
          'ESQ'
        );
      }
    }
  }
};

// Inicia o movimento dos dois motores na direção escolhida (frente ou ré)
Blockly.Blocks['brick_motores_iniciar_movimento'] = {
  init: function() {
    this.setColour(Blockly.Blocks.motores.HUE);
    this.setHelpUrl('');
    this.setInputsInline(true);
    this.appendDummyInput()
      .appendField('Iniciar movimento')
      .appendField(new Blockly.FieldDropdown([
        ['⬆️', 'FRENTE'],
        ['⬇️', 'RE']
      ]), 'DIRECAO');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Inicia o movimento usando a potência padrão configurada: seta para cima = frente, seta para baixo = ré.');
  }
};

// Inicia o movimento por um tempo (segundos/ms) usando a potência padrão, na direção escolhida
Blockly.Blocks['brick_motores_iniciar_movimento_tempo'] = {
  init: function() {
    this.setColour(Blockly.Blocks.motores.HUE);
    this.setHelpUrl('');
    this.setInputsInline(true);
    this.appendDummyInput()
      .appendField('Mover')
      .appendField(new Blockly.FieldDropdown([
        ['⬆️', 'FRENTE'],
        ['⬇️', 'RE']
      ]), 'DIRECAO')
      .appendField('por');
    this.appendValueInput('TEMPO')
      .setCheck('Number');
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        ['segundos', 'S'],
        ['milissegundos', 'MS']
      ]), 'UNIDADE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Inicia o movimento na direção escolhida por um tempo em segundos ou milissegundos, usando a potência padrão.');
  }
};

// Inicia o movimento na direção escolhida com a potência informada (sem usar a potência padrão)
Blockly.Blocks['brick_motores_iniciar_movimento_potencia'] = {
  init: function() {
    this.setColour(Blockly.Blocks.motores.HUE);
    this.setHelpUrl('');
    this.setInputsInline(true);
    this.appendDummyInput()
      .appendField('Iniciar movimento')
      .appendField(new Blockly.FieldDropdown([
        ['⬆️', 'FRENTE'],
        ['⬇️', 'RE']
      ]), 'DIRECAO')
      .appendField('com potência');
    this.appendValueInput('POTENCIA')
      .setCheck('Number');
    this.appendDummyInput()
      .appendField('%');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Inicia o movimento na direção escolhida usando a potência informada (valores de -100 a 100).');
  }
};

// Move na direção escolhida por um tempo (segundos/ms) com a potência informada
Blockly.Blocks['brick_motores_mover_tempo_potencia'] = {
  init: function() {
    this.setColour(Blockly.Blocks.motores.HUE);
    this.setHelpUrl('');
    this.setInputsInline(true);
    this.appendDummyInput()
      .appendField('Mover')
      .appendField(new Blockly.FieldDropdown([
        ['⬆️', 'FRENTE'],
        ['⬇️', 'RE']
      ]), 'DIRECAO')
      .appendField('por');
    this.appendValueInput('TEMPO')
      .setCheck('Number');
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        ['segundos', 'S'],
        ['milissegundos', 'MS']
      ]), 'UNIDADE')
      .appendField('com potência');
    this.appendValueInput('POTENCIA')
      .setCheck('Number');
    this.appendDummyInput()
      .appendField('%');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Move na direção escolhida por um tempo em segundos ou milissegundos, usando a potência informada.');
  }
};

// Define a potência padrão de movimento (BrickSimples.setPotenciaPadrao) em porcentagem
Blockly.Blocks['brick_motores_potencia_padrao'] = {
  init: function() {
    this.setColour(Blockly.Blocks.motores.HUE);
    this.setHelpUrl('');
    this.setInputsInline(true);
    this.appendDummyInput()
      .appendField('Definir potência de movimento a');
    this.appendValueInput('POTENCIA')
      .setCheck('Number');
    this.appendDummyInput()
      .appendField('%');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Define a potência padrão de movimento para os dois motores (usa brick.setPotenciaPadrao, -100 a 100).');
  }
};