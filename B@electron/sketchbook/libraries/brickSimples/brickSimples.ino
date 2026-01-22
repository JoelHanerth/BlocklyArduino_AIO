#include "brickSimples.h"

SensorLinha sensorLinha(PORTA_SERIAL_4);

void setup() {
    brick.inicializa();               // Obrigatório
    brick.adiciona(sensorLinha);      // Adiciona o sensor ao brick

    delay(1000);
}

void loop() {
    brick.atualiza();
    sensorLinha.getCorEsquerda();

    // // Leitura dos 4 sensores de linha
    // Serial.print("L1: ");
    // Serial.print(sensorLinha.getLinha(0));
    // Serial.print(" L2: ");
    // Serial.print(sensorLinha.getLinha(1));
    // Serial.print(" L3: ");
    // Serial.print(sensorLinha.getLinha(2));
    // Serial.print(" L4: ");
    // Serial.println(sensorLinha.getLinha(3));

    // // RGB do lado esquerdo (se quiser usar)
    // Serial.print("RGB: R=");
    // Serial.print(sensorLinha.getRedEsquerda());
    // Serial.print(" G=");
    // Serial.print(sensorLinha.getGreenEsquerda());
    // Serial.print(" B=");
    // Serial.print(sensorLinha.getBlueEsquerda());
    // Serial.print(" C=");
    // Serial.println(sensorLinha.getClearEsquerda());

    delay(200);
}
