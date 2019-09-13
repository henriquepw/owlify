#include <dht.h>

#include "Date_Sensor.h"

#define DHT dht;

void setup() {
  Serial.begin(9600);
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
  delay(1000);
}
