/**
 * @fileoverview Geradores de código para sensores do Brick
 */
'use strict';

goog.provide('Blockly.Arduino.brick_sensores');

goog.require('Blockly.Arduino');

// Função auxiliar: garante definição, include e registro do sensor de cor TCS34725 na porta escolhida
function brickEnsureTCSForPort(porta) {
  Blockly.Arduino.includes_['define_suporte_sensor_tcs34725'] = '#define SUPORTE_SENSOR_TCS34725 1';
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';

  var sufixo = porta.charAt(porta.length - 1);
  var varName = 'sensorTCS_porta_' + sufixo;
  var defKey = 'tcs34725_' + porta.toLowerCase();

  if (!Blockly.Arduino.definitions_[defKey]) {
    Blockly.Arduino.definitions_[defKey] =
      'TCS34725 ' + varName + '(' + porta + ');';
  }

  if (!Blockly.Arduino.definitions_['brick_manual_init']) {
    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
  }
  Blockly.Arduino.setups_['setup_brick_tcs34725_' + porta.toLowerCase()] =
    'brick.adiciona(' + varName + ');';

  return varName;
}

// Função auxiliar: garante definição, include e registro do sensor de distância VL53L0X na porta escolhida
function brickEnsureVL53ForPort(porta) {
  Blockly.Arduino.includes_['define_suporte_sensor_vl53l0x'] = '#define SUPORTE_SENSOR_VL53L0X 1';
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';

  var sufixo = porta.charAt(porta.length - 1);
  var varName = 'sensorVL53_porta_' + sufixo;
  var defKey = 'vl53l0x_' + porta.toLowerCase();

  if (!Blockly.Arduino.definitions_[defKey]) {
    Blockly.Arduino.definitions_[defKey] =
      'VL53L0X ' + varName + '(' + porta + ');';
  }

  if (!Blockly.Arduino.definitions_['brick_manual_init']) {
    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
  }
  Blockly.Arduino.setups_['setup_brick_vl53l0x_' + porta.toLowerCase()] =
    'brick.adiciona(' + varName + ');';

  return varName;
}

// Função auxiliar: garante definição, include e registro do sensor ultrassônico na porta escolhida
function brickEnsureUltrassonicoForPort(porta) {
  Blockly.Arduino.includes_['define_suporte_sensor_ultrassonico'] = '#define SUPORTE_SENSOR_ULTRASSONICO 1';
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';

  var sufixo = porta.charAt(porta.length - 1);
  var varName = 'sensorUS_porta_' + sufixo;
  var defKey = 'ultrassonico_' + porta.toLowerCase();

  if (!Blockly.Arduino.definitions_[defKey]) {
    Blockly.Arduino.definitions_[defKey] =
      'Ultrassonico ' + varName + '(' + porta + ');';
  }

  if (!Blockly.Arduino.definitions_['brick_manual_init']) {
    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
  }
  Blockly.Arduino.setups_['setup_brick_ultrassonico_' + porta.toLowerCase()] =
    'brick.adiciona(' + varName + ');';

  return varName;
}

// TCS34725 em uma porta I2C escolhida, registrado no Brick
Blockly.Arduino['brick_sensor_tcs34725_criar'] = function(block) {
  var porta = block.getFieldValue('PORTA') || 'PORTA_I2C_1';
  brickEnsureTCSForPort(porta);
  return '';
};

// Verifica se o sensor de cor está vendo a cor escolhida (retorna booleano)
Blockly.Arduino['brick_sensor_tcs34725_eh_cor'] = function(block) {
  var porta = block.getFieldValue('PORTA') || 'PORTA_I2C_1';
  var cor = block.getFieldValue('COR') || 'COR_VERMELHO';

  var varName = brickEnsureTCSForPort(porta);

  var code = varName + '.ehCor(TCS34725::' + cor + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// Retorna a cor detectada pelo sensor (enum CorBasica convertido em número)
Blockly.Arduino['brick_sensor_tcs34725_cor'] = function(block) {
  var porta = block.getFieldValue('PORTA') || 'PORTA_I2C_1';

  var varName = brickEnsureTCSForPort(porta);

  var code = varName + '.detectaCorBasica()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// Lê um valor único (R, G, B ou C) de um sensor de cor em uma porta escolhida
Blockly.Arduino['brick_sensor_tcs34725_ler'] = function(block) {
  var porta = block.getFieldValue('PORTA') || 'PORTA_I2C_1';
  var componente = block.getFieldValue('COMP') || 'R';

  var varName = brickEnsureTCSForPort(porta);

  var metodo;
  if (componente === 'R') {
    metodo = 'getR()';
  } else if (componente === 'G') {
    metodo = 'getG()';
  } else if (componente === 'B') {
    metodo = 'getB()';
  } else {
    metodo = 'getC()';
  }

  var code = varName + '.' + metodo;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// Calibra o sensor de cor na porta escolhida
Blockly.Arduino['brick_sensor_tcs34725_calibrar'] = function(block) {
  var porta = block.getFieldValue('PORTA') || 'PORTA_I2C_1';

  var varName = brickEnsureTCSForPort(porta);

  var code = varName + '.calibrar();\n';
  return code;
};

// Lê a distância do sensor VL53L0X em uma porta I2C escolhida (cm ou mm)
Blockly.Arduino['brick_sensor_vl53l0x_distancia'] = function(block) {
  var porta = block.getFieldValue('PORTA') || 'PORTA_I2C_1';
  var unid = block.getFieldValue('UNID') || 'MM';

  var varName = brickEnsureVL53ForPort(porta);

  var code;
  if (unid === 'CM') {
    // getDistancia() retorna em milímetros; converte para centímetros
    code = '(' + varName + '.getDistancia() / 10.0)';
  } else {
    // padrão: milímetros
    code = varName + '.getDistancia()';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// Compara a distância do VL53L0X com um valor em cm ou mm
Blockly.Arduino['brick_sensor_vl53l0x_compara'] = function(block) {
  var porta = block.getFieldValue('PORTA') || 'PORTA_I2C_1';
  var cond = block.getFieldValue('COND') || 'MENOR';
  var unid = block.getFieldValue('UNID') || 'CM';

  var varName = brickEnsureVL53ForPort(porta);

  var valor = Blockly.Arduino.valueToCode(block, 'VALOR', Blockly.Arduino.ORDER_MULTIPLICATIVE) || '0';
  var valorMm;
  if (unid === 'CM') {
    // valor informado está em centímetros, converte para milímetros
    valorMm = '(' + valor + ' * 10)';
  } else {
    // valor já está em milímetros
    valorMm = '(' + valor + ')';
  }

  var dist = varName + '.getDistancia()';
  var code;
  if (cond === 'MENOR') {
    code = dist + ' < ' + valorMm;
  } else if (cond === 'MAIOR') {
    code = dist + ' > ' + valorMm;
  } else { // IGUAL
    code = dist + ' == ' + valorMm;
  }

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// Lê a distância do sensor ultrassônico HC-SR04 em uma porta (cm)
Blockly.Arduino['brick_sensor_ultrassonico_distancia'] = function(block) {
  var porta = block.getFieldValue('PORTA') || 'PORTA_ULTRASSONICO_1';

  var varName = brickEnsureUltrassonicoForPort(porta);

  // getDistancia() já retorna a distância em centímetros
  var code = varName + '.getDistancia()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// Compara a distância do ultrassônico com um valor em cm
Blockly.Arduino['brick_sensor_ultrassonico_compara'] = function(block) {
  var porta = block.getFieldValue('PORTA') || 'PORTA_ULTRASSONICO_1';
  var cond = block.getFieldValue('COND') || 'MENOR';

  var varName = brickEnsureUltrassonicoForPort(porta);

  var valor = Blockly.Arduino.valueToCode(block, 'VALOR', Blockly.Arduino.ORDER_MULTIPLICATIVE) || '0';

  var dist = varName + '.getDistancia()';
  var code;
  if (cond === 'MENOR') {
    code = dist + ' < ' + valor;
  } else if (cond === 'MAIOR') {
    code = dist + ' > ' + valor;
  } else { // IGUAL
    code = dist + ' == ' + valor;
  }

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// --- Giroscópio BMI160 (via Brick) ---

// Função auxiliar para garantir definição e registro do sensor BMI160 em uma porta I2C escolhida
function brickEnsureBMI160ForPort(porta) {
  // sufixo numérico da porta (1..5)
  var sufixo = porta.charAt(porta.length - 1);
  var varName = 'bmi160_porta_' + sufixo;

  if (!Blockly.Arduino.definitions_['bmi160_' + porta]) {
    // Garante o define de suporte ao sensor BMI160 (vem antes dos includes)
    Blockly.Arduino.includes_['define_suporte_sensor_bmi160'] = '#define SUPORTE_SENSOR_BMI160 1';

    // Cria o objeto correspondente à porta escolhida
    Blockly.Arduino.definitions_['bmi160_' + porta] =
      'BMI160 ' + varName + '(' + porta + ');';
  }

  // Garante inicialização do Brick e registro do BMI160 naquela porta
  if (!Blockly.Arduino.definitions_['brick_manual_init']) {
    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
  }
  Blockly.Arduino.setups_['setup_brick_bmi160_' + porta] =
    'brick.adiciona(' + varName + ');';

  return varName;
}

// Função auxiliar para garantir definição e registro do giroscópio serial na porta escolhida
function brickEnsureGiroscopioForPort(porta) {
  var sufixo = porta.charAt(porta.length - 1);
  var varName = 'giroscopio_porta_' + sufixo;

  // Define objeto Giroscopio se ainda não existir
  if (!Blockly.Arduino.definitions_['giroscopio_' + porta.toLowerCase()]) {
    Blockly.Arduino.definitions_['giroscopio_' + porta.toLowerCase()] =
      'Giroscopio ' + varName + '(' + porta + ');';
  }

  // Garante inicialização do Brick e registro do giroscópio
  if (!Blockly.Arduino.definitions_['brick_manual_init']) {
    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
  }
  Blockly.Arduino.setups_['setup_brick_giroscopio_' + porta.toLowerCase()] =
    'brick.adiciona(' + varName + ');';

  return varName;
}

// --- Sensor de linha (via Brick) ---

// Função auxiliar para garantir definição e registro do sensor de linha na porta escolhida
function brickEnsureSensorLinhaForPort(porta) {
  var sufixo = porta.charAt(porta.length - 1);
  var varName = 'sensorLinha_porta_' + sufixo;

  if (!Blockly.Arduino.definitions_['sensor_linha_' + porta.toLowerCase()]) {
    Blockly.Arduino.definitions_['sensor_linha_' + porta.toLowerCase()] =
      'SensorLinha ' + varName + '(' + porta + ');';

    if (!Blockly.Arduino.definitions_['brick_manual_init']) {
      Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
    }
    Blockly.Arduino.setups_['setup_brick_sensor_linha_' + porta.toLowerCase()] =
      'brick.adiciona(' + varName + ');';
  }

  return varName;
}

// Lê eixo X (pitch)
Blockly.Arduino['brick_sensor_giroscopio_x'] = function(block) {
  Blockly.Arduino.includes_['define_suporte_sensor_giroscopio'] = '#define SUPORTE_SENSOR_GIROSCOPIO 1';
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';

  var porta = block.getFieldValue('PORTA') || 'PORTA_SERIAL_3';
  var varName = brickEnsureGiroscopioForPort(porta);

  var code = varName + '.getAnguloX()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// Lê eixo Y (roll)
Blockly.Arduino['brick_sensor_giroscopio_y'] = function(block) {
  Blockly.Arduino.includes_['define_suporte_sensor_giroscopio'] = '#define SUPORTE_SENSOR_GIROSCOPIO 1';
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';

  var porta = block.getFieldValue('PORTA') || 'PORTA_SERIAL_3';
  var varName = brickEnsureGiroscopioForPort(porta);

  var code = varName + '.getAnguloY()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// Lê eixo Z (yaw)
Blockly.Arduino['brick_sensor_giroscopio_z'] = function(block) {
  Blockly.Arduino.includes_['define_suporte_sensor_giroscopio'] = '#define SUPORTE_SENSOR_GIROSCOPIO 1';
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';

  var porta = block.getFieldValue('PORTA') || 'PORTA_SERIAL_3';
  var varName = brickEnsureGiroscopioForPort(porta);

  var code = varName + '.getAnguloZ()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// Zera eixo Z
Blockly.Arduino['brick_sensor_giroscopio_zerar_z'] = function(block) {
  Blockly.Arduino.includes_['define_suporte_sensor_giroscopio'] = '#define SUPORTE_SENSOR_GIROSCOPIO 1';
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';

  var porta = block.getFieldValue('PORTA') || 'PORTA_SERIAL_3';
  var varName = brickEnsureGiroscopioForPort(porta);

  var code = varName + '.zerarZ();\n';
  return code;
};

// --- Blocos para o BMI160 interno ---

// Calibra o BMI160 interno
Blockly.Arduino['brick_sensor_bmi160_calibrar'] = function(block) {
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';

  var porta = block.getFieldValue('PORTA') || 'PORTA_I2C_5';
  var varName = brickEnsureBMI160ForPort(porta);

  var code = varName + '.calibrar();\n';
  return code;
};

// Lê plano X
Blockly.Arduino['brick_sensor_bmi160_plano_x'] = function(block) {
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';

  var porta = block.getFieldValue('PORTA') || 'PORTA_I2C_5';
  var varName = brickEnsureBMI160ForPort(porta);

  var code = varName + '.getPlanoX()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// Lê plano Y
Blockly.Arduino['brick_sensor_bmi160_plano_y'] = function(block) {
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';

  var porta = block.getFieldValue('PORTA') || 'PORTA_I2C_5';
  var varName = brickEnsureBMI160ForPort(porta);

  var code = varName + '.getPlanoY()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// Lê eixo Z
Blockly.Arduino['brick_sensor_bmi160_eixo_z'] = function(block) {
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';

  var porta = block.getFieldValue('PORTA') || 'PORTA_I2C_5';
  var varName = brickEnsureBMI160ForPort(porta);

  var code = varName + '.getEixoZ()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// Reseta eixo Z
Blockly.Arduino['brick_sensor_bmi160_reseta_z'] = function(block) {
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';

  var porta = block.getFieldValue('PORTA') || 'PORTA_I2C_5';
  var varName = brickEnsureBMI160ForPort(porta);

  var code = varName + '.resetaZ();\n';
  return code;
};

// Lê um dos 4 sensores de linha (0 = branco, 100 = preto)
Blockly.Arduino['brick_sensor_linha_valor'] = function(block) {
  Blockly.Arduino.includes_['define_suporte_sensor_linha'] = '#define SUPORTE_SENSOR_LINHA 1';
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';

  var porta = block.getFieldValue('PORTA') || 'PORTA_SERIAL_4';
  var indice = block.getFieldValue('SENSOR') || '0';

  var varName = brickEnsureSensorLinhaForPort(porta);

  var code = varName + '.getLinha(' + indice + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// Lê um componente de cor (R, G, B ou C) de um dos sensores de cor (esquerda, meio ou direita)
Blockly.Arduino['brick_sensor_linha_cor'] = function(block) {
  Blockly.Arduino.includes_['define_suporte_sensor_linha'] = '#define SUPORTE_SENSOR_LINHA 1';
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';

  var porta = block.getFieldValue('PORTA') || 'PORTA_SERIAL_4';
  var pos = block.getFieldValue('POS') || 'ESQ';
  var comp = block.getFieldValue('COMP') || 'R';

  var varName = brickEnsureSensorLinhaForPort(porta);

  var metodoBase;
  if (pos === 'ESQ') {
    metodoBase = 'Esquerda';
  } else if (pos === 'MEIO') {
    metodoBase = 'Meio';
  } else {
    metodoBase = 'Direita';
  }

  var metodoPrefixo;
  if (comp === 'R') {
    metodoPrefixo = 'Red';
  } else if (comp === 'G') {
    metodoPrefixo = 'Green';
  } else if (comp === 'B') {
    metodoPrefixo = 'Blue';
  } else {
    metodoPrefixo = 'Clear';
  }

  var code = varName + '.get' + metodoPrefixo + metodoBase + '()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// Lê a cor básica detectada (enum Cor) em um dos sensores (esquerda, meio ou direita)
Blockly.Arduino['brick_sensor_linha_cor_basica'] = function(block) {
  Blockly.Arduino.includes_['define_suporte_sensor_linha'] = '#define SUPORTE_SENSOR_LINHA 1';
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';

  var porta = block.getFieldValue('PORTA') || 'PORTA_SERIAL_4';
  var pos = block.getFieldValue('POS') || 'ESQ';

  var varName = brickEnsureSensorLinhaForPort(porta);

  var metodo;
  if (pos === 'ESQ') {
    metodo = 'getCorEsquerda()';
  } else if (pos === 'MEIO') {
    metodo = 'getCorMeio()';
  } else {
    metodo = 'getCorDireita()';
  }

  var code = varName + '.' + metodo;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// Calibra o sensor de linha para a cor preta
Blockly.Arduino['brick_sensor_linha_calibrar_preto'] = function(block) {
  Blockly.Arduino.includes_['define_suporte_sensor_linha'] = '#define SUPORTE_SENSOR_LINHA 1';
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';

  var porta = block.getFieldValue('PORTA') || 'PORTA_SERIAL_4';
  var varName = brickEnsureSensorLinhaForPort(porta);

  var code = varName + '.calibrarPreto();\n';
  return code;
};

// Calibra o sensor de linha para a cor branca
Blockly.Arduino['brick_sensor_linha_calibrar_branco'] = function(block) {
  Blockly.Arduino.includes_['define_suporte_sensor_linha'] = '#define SUPORTE_SENSOR_LINHA 1';
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include <brickSimples.h>';

  var porta = block.getFieldValue('PORTA') || 'PORTA_SERIAL_4';
  var varName = brickEnsureSensorLinhaForPort(porta);

  var code = varName + '.calibrarBranco();\n';
  return code;
};
