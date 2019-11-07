#include <LoRa.h>
#include <DHT.h>

#define DHTPIN A2
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);
int count_packets = 0;
typedef struct {
  float temperature;
  float humidity;
  int id;
} Data;

/**
 * Convert data in json string 
 */
String jsonParser(Data data) {
  String json = "{";
  json += "\"temperature\":";
  json += "\"humidity\":";
  json += "\"id\"\n";
  json += data.temperature;
  json += "\":\"";
  json += data.humidity;
  json += "\":\"";
  json += data.id;
  json += "}";
}

Data getData() {
  Data data;

  data.temperature = dht.readTemperature();
  data.humidity = dht.readHumidity();
  data.id = count_packets;
  return data;
}

void setup() {
  Serial.begin(9600);
  while (!Serial);

  dht.begin();
  Serial.println("Sending something");

  if (!LoRa.begin(915E6)) {
    Serial.println("Error");
    while (1);
  }
}

void loop() {
  LoRa.idle();
  LoRa.beginPacket();
  LoRa.print(jsonParser(getData()));
  LoRa.endPacket();
  count_packets++;
  LoRa.sleep();
  delay(1000);
}
