#include "brickSimples.h"

// Sensor ultrassônico
Ultrassonico ultrassonico = Ultrassonico(PORTA_ULTRASSONICO_4);

void setup() {
    brick.inicializa();          // OBRIGATÓRIO: primeira linha do setup
    Serial.begin(115200);

    brick.adiciona(ultrassonico); // Registra o sensor no Brick
}

void loop() {
    brick.atualiza(); // OBRIGATÓRIO: primeira linha do loop

    int16_t distancia = ultrassonico.getDistancia(); // Distância em cm

    Serial.print("Distancia Ultrassonico: ");
    Serial.print(distancia);
    Serial.println(" cm");

    delay(100); // Pequeno delay para não poluir o Serial
}
