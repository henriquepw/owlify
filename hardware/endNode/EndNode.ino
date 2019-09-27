#include "EEPROM.h"
#include "DHT.h"

/* 
 * DHT pinout
 */
#define DHTPIN 2
#define DHTTYPE DHT11 // or DHT22


DHT dht(DHTPIN, DHTTYPE, 15);

typedef struct {
  float temperature,
  float humidity
} Data;

void setup() {
  Serial.begin(9600);
  Serial.println();

  dht.begin();
}

void loop () {

}

/*
 * @fix
 * to deal with errors
 */
Data get_data() {
  Data data;

  data.temperature = dht.readTemperature();
  data.humidity = dht.readHumidity();
  
  return data;
}

/*
 * Convert data to json string
 */
String json_parse(Data data){
  String json = "{";

  json += "\"temperature\": " + String(data.temperature) + ", ";
  json += "\"humidity\": " + String(data.humidity);

  json += "}";

  return json;
}
