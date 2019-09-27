#include <LoRa.h>
#include <SPI.h>
#include "heltec.h"

/**
 * LoRa pinouts
 */
#define SS        18
#define LORA_RST  14
#define DIO0      26

/**
 * LCD pinouts
 */
#define SDA       4
#define SCL       15
#define LCD_RST   16

String RxString;
String RxRSSI;

void setup() {
  Serial.begin(9600);
  while (!Serial);
  Serial.println("LoRa Receiver");

  SPI.begin(5, 19, 27, 18);
  LoRa.setPins(SS, LORA_RST, DIO0);

  Heltec.display->init();
  Heltec.display->flipScreenVertically();
  Heltec.display->setFont(ArialMT_Plain_10);
  
  if (!LoRa.begin(915E6)) {
    Serial.println("Error");
    while (1);
  }
 
 

  Serial.println("\nConnected");
  LoRa.receive();
}

void loop() {
  int packetSize = LoRa.parsePacket();
  String data = "";

  if (packetSize) {
    Serial.print("Received packet '");

    while (LoRa.available())
      data += (char)LoRa.read();

    Serial.print(data);
    Serial.print("' with RSSI ");
    RxRSSI = LoRa.packetRssi();
    Serial.println(RxRSSI);

    Heltec.display->clear();

    Heltec.display->drawString(0, 0, "Received " + String(packetSize) + " Bytes");
    Heltec.display->drawString(0, 15, data);
    Heltec.display->drawString(0, 26, "RSSi " + RxRSSI);

    Heltec.display->display();
  }

  delay(500);
}
