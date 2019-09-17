#include <LoRa.h>
#include "Data.h"

/**
 * Convert data in json string 
 */
String jsonParser() {
  Data d1;
  d1.setPin(0);

  String json = "{";
  json += "Temperature: 1, Humidity: 22";
  json += "}";

  Serial.println(json);

  return json;
}

void setup() {
  Serial.begin(9600);
  while (!Serial);

  Serial.println("Sending something");

  if (!LoRa.begin(915E6)) {
    Serial.println("Error");
    while (1);
  }
}

void loop() {
  LoRa.beginPacket();
  LoRa.print(jsonParser());
  LoRa.endPacket();

  delay(1000);
}
