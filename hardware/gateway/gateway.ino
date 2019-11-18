#include <WiFi.h>
#include <WiFiAP.h>
#include <WiFiClient.h>
#include <WebServer.h>

#include <SPI.h>
#include <LoRa.h>
#include <EEPROM.h>
// #include "heltec.h"

#include "pages.h"
#include "env.h"

/**
  * For testing
  * TODO: Remove 
  */
typedef struct {
  int rssi;
  unsigned int id;
  float temperature;
  float humidity;
  float snr;
} Data;

/**
 * LoRa pinouts
 */
#define SS        18
#define LORA_RST  14
#define DIO0      26

#define BAND      915E6

float packetsReceive = 0.0;
float packetsError = 0.0;

/**
 * Access point address
 */
IPAddress LOCAL_IP(192, 168, 4, 22);
IPAddress LOCAL_GATEWAY(192, 168, 4, 9);
IPAddress LOCAL_SUBNET(255, 255, 255, 0);

const char* LOCAL_SSID = "Panaceia";
const char* LOCAL_PASSWORD = "12345678";

int id = -1;
String ssid = SSID;
String password = PASSWORD;


WebServer server(80);
WiFiClient client;
// ESP8266HTTPUpdateServer upServer;

/**
 * @param init   memory position on EEPROM
 */
String EEPROMReadString(int init) {
  String value = "";
  int len = EEPROM.read(init);
  
  for (int i = 0; i < len; i++) 
    value += (char) EEPROM.read(init + i + 1);
    
  return value;
}

/**
 * @param limit   max length of data
 * @param init    initial memory position on EEPROM
 * @param value   the data to be saved
 */
void EEPROMWriteString(int limit, int init, String value) {
  int len = value.length() > limit ? limit : value.length();
  
  EEPROM.write(init, len);

  for (int i = 0; i < len; i++)
    EEPROM.write(init + i + 1, value[i]);
}

void setup() {
  Serial.begin(115200);
  // Heltec.begin(true /*DisplayEnable*/, true /*Heltec.LoRa*/, true /*Serial*/, true /*PABOOST*/, BAND);
  
  while (!Serial);

  initAP();
  connectWiFi();

  Serial.println("LoRa Receiver");

  SPI.begin(5, 19, 27, 18);
  LoRa.setPins(SS, LORA_RST, DIO0);
  
  if (!LoRa.begin(BAND)) {
    Serial.println("Error");
    while (1);
  }

  Serial.println("\nConnected");
  LoRa.receive();
}

void loop () {
  server.handleClient();

  if (LoRa.parsePacket()) {
    packetsReceive++;

    String response = getLoRaResponse();
    Data data = dataParser(response);
    data.rssi = LoRa.packetRssi();
    data.snr = LoRa.packetSnr(); 

    if (!isPacketCorrect(response, data)){
      sendDataFailure(data);
      packetsError++;
    } else {
      sendDataSuccess(data);
    }

    Serial.print("\n\nResponse: ");
    Serial.println(response);

    Serial.print("Data: ");
    Serial.print(data.temperature); 
    Serial.print(";");
    Serial.print(data.humidity);
    Serial.print(";");
    Serial.println(data.id);
    Serial.print("Packets receive: ");
    Serial.print(packetsReceive);
    Serial.print(", Packets error: ");
    Serial.print(packetsError);
    Serial.print(", RSSI: ");
    Serial.print(data.rssi);
    Serial.print(", SNR: ");
    Serial.println(data.snr);

    delay(3000);
  }
}

/**
 * *LoRa
 * TODO: Refactoring
 */
String getLoRaResponse() {
  String response = "";
 
  while(LoRa.available())
    response += (char) LoRa.read();

  return response;
}

/**
 * convert String to Data
 */
Data dataParser(String response) {
  Data data;

  String tmp[] = {"", "", ""};
  int j = 0;

  for (int i = 0; i < response.length(); i++) {
    if (response[i] == ':') {
      j++;
      continue;
    }
    
    tmp[j] += response[i];
  }

  data.temperature = tmp[0].toFloat();
  data.humidity = tmp[1].toFloat();
  data.id = tmp[2].toInt();

  return data;
}

bool isPacketCorrect(String response, Data data) {
  String packet = String(data.temperature);
  packet += ":";
  packet += String(data.humidity);
  packet += ":";
  packet += String(data.id);

  return !packet.compareTo(response) ? true : false;
}

/**
 * *WiFi
 * TODO: fix data
 */
void handleRootGet() {
  Data data = dataParser("10.10:10.10:1");
  String buff = rootPage(data.id, ssid, data.temperature, data.humidity);
  server.send(200, "text/html", buff);
}

void handleRootPost() {
  if (server.hasArg("id") && server.hasArg("network") && server.hasArg("password")) {
    EEPROM.begin(200);

    EEPROM.write(0, 1); // condition

    if (server.arg("id").length() > 0) {
      EEPROM.write(1, server.arg("id").toInt()); // id
      id = EEPROM.read(1);
      Serial.println(id);
    }
    
    if (server.arg("network").length() > 0) {
      EEPROMWriteString(32, 2, server.arg("network"));
      EEPROMWriteString(32, 36, server.arg("password"));

      ssid = EEPROMReadString(2);
      Serial.println(ssid);

      password = EEPROMReadString(36);
      Serial.println(password);
      
      connectWiFi();
    }

    EEPROM.end();
  }

  handleRootGet();
}

void handleSettings() {
  String buff = settingsPage();
  server.send(200, "text/html", buff);
}

/**
 * Starting html pages
 */
void initServices() {
  // upServer.setup(&server);
  
  server.on("/", HTTP_GET, handleRootGet);
  server.on("/", HTTP_POST, handleRootPost);
  server.on("/settings", handleSettings);

  server.begin();
}

/**
 * Starting access point network
 */
void initAP() {
  Serial.print("Configuring network... ");
  Serial.println(WiFi.softAPConfig(LOCAL_IP, LOCAL_GATEWAY, LOCAL_SUBNET) ? "Ready" : "Failed!");

  Serial.print("Starting WiFi network... ");
  Serial.println(WiFi.softAP(LOCAL_SSID, LOCAL_PASSWORD) ? "Ready" : "Failed!");

  Serial.print("IP address: ");
  Serial.println(WiFi.softAPIP());
  
  initServices();
}

/**
 * Conecting to wifi network
 * TODO: escape from the loop if not connected a determined time
 */
void connectWiFi() {
  Serial.print("Conecting to WiFi...");
  
  WiFi.mode(WIFI_AP_STA);
  WiFi.begin(ssid.c_str(), password.c_str());

  int count = 0;
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    count++;

    if(count >= 30) break;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.print("\nConnected, IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\nErro to connect...");
  }
}

/**
 * *Send data to server
 */
void sendData(String data, String url) {
  if (client.connect(SERVER, HTTP_PORT)) {
    Serial.print("Connected - ");
    Serial.println(data); 

    client.println("POST /" + url + "/" + HOST + " HTTP/1.1");
    client.print("Host: ");
    client.println(SERVER);
    client.println("User-Agent: Gateway");
    client.println("Content-Type: application/json");
    client.println("Connection: Close");
    client.print("Content-Length: ");
    client.println(data.length());
    client.println();
    client.println(data);

    delay(2000);
    client.stop();

    Serial.println("Client has closed");
  } else {
    Serial.println("Connection failed");
  }
}

void sendDataFailure(Data data) {
  String json = "{";
  json += "\"rssi\": ";
  json += String(data.rssi);
  json += ", \"snr\": ";
  json += String(data.snr);
  json += ", \"id\": ";
  json += String(data.id);
  json += ", \"success\": false";
  json += "}";

  sendData(json, "packages");
}

void sendDataSuccess(Data data) {
  String json = "{";
  json += "\"rssi\": ";
  json += String(data.rssi);
  json += ", \"snr\": ";
  json += String(data.snr);
  json += ", \"id\": ";
  json += String(data.id);
  json += ", \"temperature\": ";
  json += String(data.temperature);
  json += ", \"humidity\": ";
  json += String(data.humidity);
  json += "}";

  sendData(json, "sensors");
}