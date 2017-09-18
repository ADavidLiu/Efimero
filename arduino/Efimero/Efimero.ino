#include <Servo.h>

int ledRojo = 11;
int ledAzul = 10;
int ledVerde = 9;

int pir = 2;

Servo servo;
int servoPin = 5;

void setup() {
    pinMode(ledRojo, OUTPUT);
    pinMode(ledAzul, OUTPUT);
    pinMode(ledVerde, OUTPUT);
    pinMode(pir, INPUT);
    servo.attach(5);
    Serial.begin(9600);
}

void loop() {
    int pirLectura = digitalRead(pir);
    delay(6000); // El delay es esencial
    Serial.println(pirLectura);
    if (pirLectura == HIGH) {
        color(255, 0, 0);
        girar();
    } else {
        color(0, 255, 0);
        parar();
    }
}

void color(int r, int g, int b) {
    analogWrite(ledRojo, r);
    analogWrite(ledVerde, g);
    analogWrite(ledAzul, b);
}

void girar() {
    delay(1000);
    servo.write(0);
    delay(1000);
    servo.write(90);
}

void parar() {
  servo.write(0);
}
