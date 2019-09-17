#include <LoRa.h>
#include <SPI.h>

#define ss 18
#define rst 14
#define dio0 26

String RxString;
String RxRSSI;

void setup() {
  Serial.begin(9600);
  while (!Serial);
  Serial.println("LoRa Receiver");

  SPI.begin(5, 19, 27, 18);
  LoRa.setPins(ss, rst, dio0);

  if (!LoRa.begin(915E6)) {
    Serial.println("Error");
    while (1);
  }

  Serial.println("\nConnected");
  LoRa.receive();
}

void loop() {
  int packetSize = LoRa.parsePacket();

  if (packetSize) {
    Serial.print("Received packet '");

    while (LoRa.available())
      Serial.print((char)LoRa.read());

    Serial.print("' with RSSI ");
    RxRSSI = LoRa.packetRssi();
    Serial.println(RxRSSI);
  }

  delay(500);
}
