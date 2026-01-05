#include "brickSimples.h"

void setup() {
    brick.inicializa(); // OBRIGATÓRIO: primeira linha do setup

    // Inicializa os servos
    servos.iniciaServo(PORTA_SERVO_2);
}

void loop() {
    brick.atualiza(); // OBRIGATÓRIO: primeira linha do loop

    // // Move os servos
    // servos.moveServoTempo(PORTA_SERVO_2, 0, 2000);


    // delay(1000);

    // servos.moveServoTempo(PORTA_SERVO_2, 180, 2000);

    delay(1000);
}
