#include <LoRa.h>
#include <DHT.h>

#define DHTPIN A2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

typedef struct {
  float temperature;
  float humidity;
} Data;

/**
 * Convert data in json string 
 */
String jsonParser(Data data) {
  String json = "{";
  json += "\"Temperature\": ";
  json += data.temperature;
  json += ", \"Humidity\": ";
  json += data.humidity;
  json += "}";

  Serial.println(json);

  return json;
}

Data getData() {
  Data data;

  data.temperature = dht.readTemperature();
  data.humidity = dht.readHumidity();

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
  LoRa.beginPacket();
  LoRa.print(jsonParser(getData()));
  LoRa.endPacket();

  delay(5000);
}
