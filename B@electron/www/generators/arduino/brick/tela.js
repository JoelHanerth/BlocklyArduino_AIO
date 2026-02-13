'use strict';

goog.provide('Blockly.Arduino.tela');

goog.require('Blockly.Arduino');

// =============================
// Blocos de Tela (SSD1306)
// =============================

// Garante defines/includes e setup padrão para a tela na porta escolhida
function brickTelaEnsureSetup(porta) {
  // Ativa suporte ao display dentro de brickSimples.h
  Blockly.Arduino.includes_['define_suporte_display_ssd1306'] = '#define SUPORTE_DISPLAY_SSD1306 1';
  // brickSimples traz portas.h, SSD1306.h (via define acima) e demais dependências
  Blockly.Arduino.definitions_['include_brick_simples'] = '#include "brickSimples.h"';

  // Garante que o Brick é inicializado, caso o usuário não tenha feito manualmente
  if (!Blockly.Arduino.definitions_['brick_manual_init']) {
    Blockly.Arduino.setups_['setup_brick_simples'] = 'brick.inicializa();';
  }

  // Nome do objeto de tela e constante da porta (sem "i2c" no nome)
  var nomeTela = 'tela_porta_' + porta;
  var portaConst = 'PORTA_I2C_' + porta;

  // Declara e inicializa apenas uma vez por porta
  Blockly.Arduino.definitions_['declare_' + nomeTela] = 'SSD1306 ' + nomeTela + '(' + portaConst + ');';
//   Blockly.Arduino.setups_['setup_' + nomeTela] = nomeTela + '.init();';
  // Registra esse teclado específico no Brick (que chama init() internamente)
    Blockly.Arduino.setups_['setup_tela_' + porta.toLowerCase()] =
      'brick.adiciona(' + nomeTela + ');';

  return nomeTela;
}
// Imprimir na tela OLED
Blockly.Arduino['brick_tela_print'] = function(block) {
  var porta = block.getFieldValue('PORTA') || '4';
  var nomeTela = brickTelaEnsureSetup(porta);

  var texto = Blockly.Arduino.valueToCode(block, 'TEXTO', Blockly.Arduino.ORDER_ATOMIC) || '""';
  var code = nomeTela + '.print(' + texto + ');\n';
  return code;
};

// Limpar a tela OLED
Blockly.Arduino['brick_tela_clear'] = function(block) {
  var porta = block.getFieldValue('PORTA') || '4';
  var nomeTela = brickTelaEnsureSetup(porta);

  var code = nomeTela + '.clear();\n';
  return code;
};

// Mudar tamanho da fonte da tela
Blockly.Arduino['brick_tela_set_fonte'] = function(block) {
  var porta = block.getFieldValue('PORTA') || '4';
  var nomeTela = brickTelaEnsureSetup(porta);

  var tamanho = block.getFieldValue('TAMANHO') || 'PEQUENA';
  var constante;
  if (tamanho === 'MEDIA') {
    constante = 'SSD1306::FONTE_MEDIA';
  } else if (tamanho === 'GRANDE') {
    constante = 'SSD1306::FONTE_GRANDE';
  } else {
    constante = 'SSD1306::FONTE_PEQUENA';
  }

  var code = nomeTela + '.setFonte(' + constante + ');\n';
  return code;
};

// Definir posição do cursor na tela
Blockly.Arduino['brick_tela_set_cursor'] = function(block) {
  var porta = block.getFieldValue('PORTA') || '4';
  var nomeTela = brickTelaEnsureSetup(porta);

  var coluna = Blockly.Arduino.valueToCode(block, 'COLUNA', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var linha = Blockly.Arduino.valueToCode(block, 'LINHA', Blockly.Arduino.ORDER_ATOMIC) || '0';

  var code = nomeTela + '.setCursor(' + coluna + ', ' + linha + ');\n';
  return code;
};

// Enviar apenas retorno de carro ("\r") para a tela
Blockly.Arduino['brick_tela_ret_carro'] = function(block) {
  var porta = block.getFieldValue('PORTA') || '4';
  var nomeTela = brickTelaEnsureSetup(porta);

  var code = nomeTela + '.print("\\r");\n';
  return code;
};