#include <DHT.h>
#include <LoRa.h>
#include <SPI.h>

#include "Date_Sensor.h"

void setup() {
 Serial.begin(9600);
 while(!Serial);
 Serial.println("LoRa Sender");
if (!LoRa.begin(915E6)) {
  Serial.println("Starting LoRa failed!");
  while (1);
  }
}

String getJson(){
  Date d1;
  d1.setPin(0);
  String json = "{";
  json += "Temperature: " + d1.getTemp() + ", " + "Humidity: " + d1.getHumid();
  json+="}";
  return json;
}

void loop() {
  Serial.println("Sending...");
  LoRa.beginPacket();
  LoRa.print(getJson());
  LoRa.endPacket();
  delay(1000);
}
