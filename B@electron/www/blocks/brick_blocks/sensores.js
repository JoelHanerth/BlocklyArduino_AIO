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
		 .appendField(new Blockly.FieldImage(
            Blockly.pathToBlockly + 'blocks/brick_blocks/assets/tcs34725.png',
            45,
            18
        ))
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
        .appendField(new Blockly.FieldImage(
            Blockly.pathToBlockly + 'blocks/brick_blocks/assets/tcs34725.png',
            45,
            18
        ))
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
        .appendField(new Blockly.FieldImage(
            Blockly.pathToBlockly + 'blocks/brick_blocks/assets/tcs34725.png',
            45,
            18
        ))
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
        .appendField(new Blockly.FieldImage(
            Blockly.pathToBlockly + 'blocks/brick_blocks/assets/tcs34725.png',
            45,
            18
        ))
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
        .appendField(new Blockly.FieldImage(
            Blockly.pathToBlockly + 'blocks/brick_blocks/assets/tcs34725.png',
            45,
            18
        ))
        .appendField('porta')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'PORTA_I2C_1'],
          ['2', 'PORTA_I2C_2'],
          ['3', 'PORTA_I2C_3'],
          ['4', 'PORTA_I2C_4'],
          ['5', 'PORTA_I2C_5']
        ]), 'PORTA')
        .appendField('calibrar');
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
        .appendField(new Blockly.FieldImage(
            Blockly.pathToBlockly + 'blocks/brick_blocks/assets/vl53l0x.png',
            45,
            18
        ))
        .appendField('porta')
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
        .appendField(new Blockly.FieldImage(
            Blockly.pathToBlockly + 'blocks/brick_blocks/assets/vl53l0x.png',
            45,
            18
        ))
    .appendField('porta')
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

// Lê a distância do sensor ultrassônico HC-SR04 em uma porta, em cm
Blockly.Blocks['brick_sensor_ultrassonico_distancia'] = {
  init: function() {
    this.setColour(Blockly.Blocks.brick_sensores.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage(
        Blockly.pathToBlockly + 'blocks/brick_blocks/assets/ultrassonico.png',
        45,
        18
    ))
        .appendField('porta')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'PORTA_ULTRASSONICO_1'],
          ['2', 'PORTA_ULTRASSONICO_2'],
          ['3', 'PORTA_ULTRASSONICO_3'],
          ['4', 'PORTA_ULTRASSONICO_4'],
          ['5', 'PORTA_ULTRASSONICO_5']
        ]), 'PORTA')
        .appendField('distância em cm');
    this.setOutput(true, 'Number');
    this.setTooltip('Lê a distância em centímetros do sensor ultrassônico conectado na porta escolhida.');
  }
};

// Compara a distância do ultrassônico com um valor em cm
Blockly.Blocks['brick_sensor_ultrassonico_compara'] = {
  init: function() {
    this.setColour(Blockly.Blocks.brick_sensores.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
  .appendField(new Blockly.FieldImage(
      Blockly.pathToBlockly + 'blocks/brick_blocks/assets/ultrassonico.png',
      45,
      18
  ))
  .appendField('porta')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'PORTA_ULTRASSONICO_1'],
          ['2', 'PORTA_ULTRASSONICO_2'],
          ['3', 'PORTA_ULTRASSONICO_3'],
          ['4', 'PORTA_ULTRASSONICO_4'],
          ['5', 'PORTA_ULTRASSONICO_5']
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
		.appendField('cm');
    this.setOutput(true, 'Boolean');
    this.setTooltip('Retorna verdadeiro se a distância medida pelo ultrassônico for mais perto, igual ou mais longe que o valor informado em centímetros.');
  }
};

// --- Sensor de linha (via Brick) ---

// Lê um dos 4 sensores de linha (0 = branco, 100 = preto)
Blockly.Blocks['brick_sensor_linha_valor'] = {
  init: function() {
    this.setColour(Blockly.Blocks.brick_sensores.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField('sensor de linha porta serial')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'PORTA_SERIAL_1'],
          ['2', 'PORTA_SERIAL_2'],
          ['3', 'PORTA_SERIAL_3'],
          ['4', 'PORTA_SERIAL_4'],
          ['5', 'PORTA_SERIAL_5']
        ]), 'PORTA')
        .appendField('sensor')
        .appendField(new Blockly.FieldDropdown([
          ['1', '0'],
          ['2', '1'],
          ['3', '2'],
          ['4', '3']
        ]), 'SENSOR');
    this.setOutput(true, 'Number');
    this.setTooltip('Lê um dos 4 sensores de linha (0 = branco, 100 = preto).');
  }
};

// Lê um componente de cor (R, G, B ou C) de um dos sensores de cor (esquerda, meio ou direita)
Blockly.Blocks['brick_sensor_linha_cor'] = {
  init: function() {
    this.setColour(Blockly.Blocks.brick_sensores.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField('sensor de linha porta serial')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'PORTA_SERIAL_1'],
          ['2', 'PORTA_SERIAL_2'],
          ['3', 'PORTA_SERIAL_3'],
          ['4', 'PORTA_SERIAL_4'],
          ['5', 'PORTA_SERIAL_5']
        ]), 'PORTA')
        .appendField('sensor')
        .appendField(new Blockly.FieldDropdown([
          ['1 (esquerda)', 'ESQ'],
          ['2 (meio)', 'MEIO'],
          ['3 (direita)', 'DIR']
        ]), 'POS')
        .appendField('cor')
        .appendField(new Blockly.FieldDropdown([
          ['vermelho (R)', 'R'],
          ['verde (G)', 'G'],
          ['azul (B)', 'B'],
          ['claro (C)', 'C']
        ]), 'COMP');
    this.setOutput(true, 'Number');
    this.setTooltip('Lê um valor de cor (R, G, B ou C) de um dos sensores de cor (esquerda, meio ou direita).');
  }
};

// Lê a cor básica detectada (preto, branco, vermelho, amarelo, azul, verde)
Blockly.Blocks['brick_sensor_linha_cor_basica'] = {
  init: function() {
    this.setColour(Blockly.Blocks.brick_sensores.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField('sensor de linha porta serial')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'PORTA_SERIAL_1'],
          ['2', 'PORTA_SERIAL_2'],
          ['3', 'PORTA_SERIAL_3'],
          ['4', 'PORTA_SERIAL_4'],
          ['5', 'PORTA_SERIAL_5']
        ]), 'PORTA')
        .appendField('sensor')
        .appendField(new Blockly.FieldDropdown([
          ['1 (esquerda)', 'ESQ'],
          ['2 (meio)', 'MEIO'],
          ['3 (direita)', 'DIR']
        ]), 'POS')
        .appendField('cor básica');
    this.setOutput(true, 'Number');
    this.setTooltip('Lê a cor básica detectada (preto, branco, vermelho, amarelo, azul, verde) em um dos sensores de cor (esquerda, meio ou direita).');
  }
};

// --- Giroscópio BMI160 (via Brick) ---

// Lê eixo X (pitch) do giroscópio em uma porta serial escolhida
Blockly.Blocks['brick_sensor_giroscopio_x'] = {
  init: function() {
    this.setColour(Blockly.Blocks.brick_sensores.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField('giroscópio porta serial')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'PORTA_SERIAL_1'],
          ['2', 'PORTA_SERIAL_2'],
          ['3', 'PORTA_SERIAL_3'],
          ['4', 'PORTA_SERIAL_4'],
          ['5', 'PORTA_SERIAL_5']
        ]), 'PORTA')
        .appendField('eixo X (°)');
    this.setOutput(true, 'Number');
    this.setTooltip('Lê o ângulo X (pitch) do giroscópio conectado na porta serial escolhida.');
  }
};

// Lê eixo Y (roll) do giroscópio em uma porta serial escolhida
Blockly.Blocks['brick_sensor_giroscopio_y'] = {
  init: function() {
    this.setColour(Blockly.Blocks.brick_sensores.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField('giroscópio porta serial')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'PORTA_SERIAL_1'],
          ['2', 'PORTA_SERIAL_2'],
          ['3', 'PORTA_SERIAL_3'],
          ['4', 'PORTA_SERIAL_4'],
          ['5', 'PORTA_SERIAL_5']
        ]), 'PORTA')
        .appendField('eixo Y (°)');
    this.setOutput(true, 'Number');
    this.setTooltip('Lê o ângulo Y (roll) do giroscópio conectado na porta serial escolhida.');
  }
};

// Lê eixo Z (yaw) do giroscópio em uma porta serial escolhida
Blockly.Blocks['brick_sensor_giroscopio_z'] = {
  init: function() {
    this.setColour(Blockly.Blocks.brick_sensores.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField('giroscópio porta serial')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'PORTA_SERIAL_1'],
          ['2', 'PORTA_SERIAL_2'],
          ['3', 'PORTA_SERIAL_3'],
          ['4', 'PORTA_SERIAL_4'],
          ['5', 'PORTA_SERIAL_5']
        ]), 'PORTA')
        .appendField('eixo Z (°)');
    this.setOutput(true, 'Number');
    this.setTooltip('Lê o ângulo Z (yaw) do giroscópio conectado na porta serial escolhida.');
  }
};

// Zera o eixo Z do giroscópio em uma porta serial escolhida
Blockly.Blocks['brick_sensor_giroscopio_zerar_z'] = {
  init: function() {
    this.setColour(Blockly.Blocks.brick_sensores.HUE);
    this.setHelpUrl('');
    this.appendDummyInput()
        .appendField('giroscópio porta serial')
        .appendField(new Blockly.FieldDropdown([
          ['1', 'PORTA_SERIAL_1'],
          ['2', 'PORTA_SERIAL_2'],
          ['3', 'PORTA_SERIAL_3'],
          ['4', 'PORTA_SERIAL_4'],
          ['5', 'PORTA_SERIAL_5']
        ]), 'PORTA')
        .appendField('zerar eixo Z');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Zera o ângulo Z (yaw) do giroscópio conectado na porta serial escolhida.');
  }
};

// Tipagem dos blocos de sensores Brick para o sistema Blockly.Types
// (necessário para atribuições em variáveis tipadas)
if (Blockly.Types) {
  // TCS34725
  Blockly.Blocks['brick_sensor_tcs34725_eh_cor'].getBlockType = function() {
    return Blockly.Types.BOOLEAN;
  };
  Blockly.Blocks['brick_sensor_tcs34725_cor'].getBlockType = function() {
    return Blockly.Types.NUMBER;
  };
  Blockly.Blocks['brick_sensor_tcs34725_ler'].getBlockType = function() {
    return Blockly.Types.NUMBER;
  };

  // VL53L0X
  Blockly.Blocks['brick_sensor_vl53l0x_distancia'].getBlockType = function() {
    return Blockly.Types.NUMBER;
  };
  Blockly.Blocks['brick_sensor_vl53l0x_compara'].getBlockType = function() {
    return Blockly.Types.BOOLEAN;
  };

  // Ultrassônico
  Blockly.Blocks['brick_sensor_ultrassonico_distancia'].getBlockType = function() {
    return Blockly.Types.NUMBER;
  };
  Blockly.Blocks['brick_sensor_ultrassonico_compara'].getBlockType = function() {
    return Blockly.Types.BOOLEAN;
  };

  // Sensor de linha
  Blockly.Blocks['brick_sensor_linha_valor'].getBlockType = function() {
    return Blockly.Types.NUMBER;
  };
  Blockly.Blocks['brick_sensor_linha_cor'].getBlockType = function() {
    return Blockly.Types.NUMBER;
  };
  Blockly.Blocks['brick_sensor_linha_cor_basica'].getBlockType = function() {
    return Blockly.Types.NUMBER;
  };

  // Giroscópio
  Blockly.Blocks['brick_sensor_giroscopio_x'].getBlockType = function() {
    return Blockly.Types.NUMBER;
  };
  Blockly.Blocks['brick_sensor_giroscopio_y'].getBlockType = function() {
    return Blockly.Types.NUMBER;
  };
  Blockly.Blocks['brick_sensor_giroscopio_z'].getBlockType = function() {
    return Blockly.Types.NUMBER;
  };
  Blockly.Blocks['brick_sensor_giroscopio_zerar_z'].getBlockType = function() {
    return Blockly.Types.NULL;
  };
}
