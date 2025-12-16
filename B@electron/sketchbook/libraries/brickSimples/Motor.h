class Motor {
public:
    enum TipoMotor {
        ESQUERDO,
        DIREITO
    };

private:
    // Arrays para armazenar os pinos e inversão
    static int pinoPWM[2];
    static int pinoDIR[2];
    static bool invertido[2];

public:
    // Inicializa os pinos dos motores
    static void inicializa() {
        pinoPWM[ESQUERDO] = 9;
        pinoDIR[ESQUERDO] = 7;
        pinoPWM[DIREITO]  = 10;
        pinoDIR[DIREITO]  = 4;

        pinMode(pinoPWM[ESQUERDO], OUTPUT);
        pinMode(pinoDIR[ESQUERDO], OUTPUT);
        pinMode(pinoPWM[DIREITO], OUTPUT);
        pinMode(pinoDIR[DIREITO], OUTPUT);
    }

    static void inverte(TipoMotor motor, bool inv) {
        invertido[motor] = inv;
    }

    static void setPotencia(TipoMotor motor, int potencia) {
        if(invertido[motor]) potencia = -potencia;
        potencia = constrain(potencia, -255, 255);

        if(potencia >= 0) {
            analogWrite(pinoPWM[motor], potencia);
            digitalWrite(pinoDIR[motor], LOW);
        } else {
            analogWrite(pinoPWM[motor], 255 - (-potencia));
            digitalWrite(pinoDIR[motor], HIGH);
        }
    }

    static void parar(TipoMotor motor) {
        digitalWrite(pinoPWM[motor], LOW);
        digitalWrite(pinoDIR[motor], LOW);
    }

    static void frear(TipoMotor motor) {
        digitalWrite(pinoPWM[motor], HIGH);
        digitalWrite(pinoDIR[motor], HIGH);
    }
};

// Definição das variáveis estáticas
int Motor::pinoPWM[2];
int Motor::pinoDIR[2];
bool Motor::invertido[2];
