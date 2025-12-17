/**
 * Visual Blocks Language
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Blocos para controle de motores
 */
'use strict';

goog.provide('Blockly.Blocks.motor');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

Blockly.Blocks.motor.HUE = "#0090F5";

Blockly.Blocks['brick_potencia_motores'] = {
  init: function() {
    this.setColour(Blockly.Blocks.motor.HUE);
    this.setHelpUrl('');
    this.setInputsInline(true);
    this.appendDummyInput()
        .appendField("Potência dos Motores");
    this.appendValueInput("MOTOR1")
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Motor 1");
    this.appendValueInput("MOTOR2")
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Motor 2");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("Define a potência dos motores (valores de -100 a 100)");
  }
};

// Define a direção (normal/invertido) de um motor
Blockly.Blocks['brick_motor_direcao'] = {
  init: function() {
    this.setColour(Blockly.Blocks.motor.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField('Direção do motor')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'MOTOR1'],
          ['2', 'MOTOR2']
        ]), 'MOTOR')
        .appendField('para')
        .appendField(new Blockly.FieldDropdown([
          ['normal', 'MOTOR_NORMAL'],
          ['invertido', 'MOTOR_INVERTIDO']
        ]), 'DIRECAO');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Escolhe se o motor gira na direção normal ou invertida.');
  }
};

Blockly.Blocks['brick_parar_motores'] = {
  init: function() {
    this.setColour(Blockly.Blocks.motor.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField("Parar motores");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("Para ambos os motores (brick.pararMotores)");
  }
};

// Cria/configura um objeto Motor para uma porta e direção escolhidas
Blockly.Blocks['brick_motor_criar'] = {
  init: function() {
    this.setColour(Blockly.Blocks.motor.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField("Configurar motor na porta")
        .appendField(new Blockly.FieldDropdown([
          ['1', 'PORTA_MOTOR_1'],
          ['2', 'PORTA_MOTOR_2']
        ]), 'PORTA')
        .appendField("direção")
        .appendField(new Blockly.FieldDropdown([
          ['normal', 'MOTOR_NORMAL'],
          ['invertido', 'MOTOR_INVERTIDO']
        ]), 'DIRECAO');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Cria o objeto Motor (Motor1 ou Motor2) com a porta e direção escolhidas.');
  }
};

// Controla a potência de um único motor (Motor1.potencia / Motor2.potencia)
Blockly.Blocks['brick_motor_potencia'] = {
  init: function() {
    this.setColour(Blockly.Blocks.motor.HUE);
    this.setHelpUrl('');
    this.setInputsInline(true);
    this.appendDummyInput()
        .appendField('Motor')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'MOTOR1'],
          ['2', 'MOTOR2']
        ]), 'MOTOR');
    this.appendValueInput('POTENCIA')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField('potência');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Define a potência de um único motor (usa Motor1.potencia ou Motor2.potencia).');
  }
};

// Freia um único motor (Motor1.frear / Motor2.frear)
Blockly.Blocks['brick_motor_frear'] = {
  init: function() {
    this.setColour(Blockly.Blocks.motor.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField('Frear motor')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'MOTOR1'],
          ['2', 'MOTOR2']
        ]), 'MOTOR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Freia apenas o motor escolhido (Motor1.frear ou Motor2.frear).');
  }
};

Blockly.Blocks['brick_motores_movimento'] = {
  init: function() {
    this.setColour(Blockly.Blocks.motor.HUE);
    this.appendDummyInput()
      .appendField('Definir motores de movimento:')
      .appendField('esquerdo')
      .appendField(new Blockly.FieldDropdown([
        ['Motor 1', 'MOTOR1'],
        ['Motor 2', 'MOTOR2']
      ]), 'ESQ')
      .appendField('direito')
      .appendField(new Blockly.FieldDropdown([
        ['Motor 2', 'MOTOR2'],
        ['Motor 1', 'MOTOR1']
      ]), 'DIR');

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
