#include <brickSimples.h>

void setup() {
  brick.inicializa();

}

void loop() {
    brick.atualiza();
    brick.potenciaMotores(0, 0);

}