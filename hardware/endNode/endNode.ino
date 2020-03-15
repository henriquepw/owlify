#include <LoRa.h>
#include <DHT.h>

#include "env.h"

#define DHTPIN A2
#define DHTTYPE DHT22

typedef struct {
  float temperature;
  float humidity;
  unsigned int count;
  unsigned int id;
} Data;

DHT dht(DHTPIN, DHTTYPE);
Data data;

/**
 * Convert data in package string 
 */
String packageParser(Data data) {
  String package = String(data.temperature);
  package += ":";
  package += String(data.humidity);
  package += ":";
  package += String(data.id);
  package += ":";
  package += String(data.count);

  Serial.println(package);

  return package;
}

void getData() {
  data.temperature = dht.readTemperature();
  data.humidity = dht.readHumidity();
  data.count++;
}

void setup() {
  Serial.begin(9600);
  while (!Serial);

  dht.begin();
  Serial.println("Sending something");
  data.temperature = 0;
  data.humidity = 0;
  data.count = 0;
  data.id = ID;

  if (!LoRa.begin(915E6)) {
    Serial.println("Error");
    while (1);
  }
}

void loop() {
  getData();

  LoRa.beginPacket();
  LoRa.print(packageParser(data));
  LoRa.endPacket();
  LoRa.idle();

  delay(1000); // 300000 = 5 minutos
}
