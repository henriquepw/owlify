
#include <dht.h>
#include "Date_Sensor.h"
#include <LoRa.h>
#define DHT dht;

void setup() {
  Serial.begin(9600);
  while(!Serial);
  
  Serial.println("Sending something");
  
 if(!LoRa.begin(915E6)){
  Serial.println("Error");
  while(1);
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
  
  LoRa.beginPacket();
  LoRa.println(getJson());
  LoRa.endPacket();
  delay(1000);
}
