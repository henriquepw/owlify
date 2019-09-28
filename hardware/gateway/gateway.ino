#include <WiFi.h>
#include <WiFiAP.h>
#include <WiFiClient.h>
#include <WebServer.h>

#include <SPI.h>
#include <EEPROM.h>
#include "heltec.h"

#include "pages.h"
#include "env.h"

/**
  * For testing
  * TODO: Remove 
  */
typedef struct {
  float temperature;
  float humidity;
} Data;

/**
 * LoRa pinouts
 */
#define SS        18
#define LORA_RST  14
#define DIO0      26

#define BAND      915E6

String RxString;
String RxRSSI;

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
  Heltec.begin(true /*DisplayEnable*/, true /*Heltec.LoRa*/, true /*Serial*/, true /*PABOOST*/, BAND);
  
  while (!Serial);

  Heltec.display->init();
  Heltec.display->flipScreenVertically();
  Heltec.display->setFont(ArialMT_Plain_16);

  initAP();
  connectWiFi();

  Serial.println("LoRa Receiver");

  SPI.begin(5, 19, 27, 18);
  LoRa.setPins(SS, LORA_RST, DIO0);

  Heltec.display->drawString(0, 0, "Gateway");
  Heltec.display->display();

  Serial.println("\nConnected");
  LoRa.receive();
}

void loop () {
  server.handleClient();

  int packetSize = LoRa.parsePacket();

  if (packetSize) {
    packetsReceive++;
    Serial.print("Received packet '");

    String data = getLoRaResponse();

    if (!isPacketCorrect(data, getTemp(data), getHumi(data)))
      packetsError++;

    Serial.println(data);
    Serial.print("Packets receive: ");
    Serial.print(packetsReceive);
    Serial.print(", Packets error: ");
    Serial.print((packetsError / packetsReceive) * 100);
    Serial.print("%");
    Serial.print(", RSSI: ");
    RxRSSI = LoRa.packetRssi();
    Serial.println(RxRSSI);

    Heltec.display->clear();

    Heltec.display->drawString(0, 0, "Received " + String(packetSize) + " Bytes");
    Heltec.display->drawString(0, 15, data);
    Heltec.display->drawString(0, 26, "RSSi " + RxRSSI);

    Heltec.display->display();
  }

  // TODO: receive json
  sendData("{ \"temperature\": 10, \"humidity\": 10}");
  delay(1000);
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
 * TODO: get data from LoRa
 */
Data getData() {
  Data data;
  data.temperature = random(-10, 40);
  data.humidity = random(0, 100);

  return data;
}

double getTemp(String str) {
  String temperature = "";

  for(int i = 16; i < 21; i++)
    temperature += str[i];

  return temperature.toDouble();
}

double getHumi(String str) {
  String humidity = "";

  for(int i = 35; i < 40; i++)
    humidity += str[i]; 

  return humidity.toDouble();
}

bool isNum(String data) {
  String temp(getTemp(data));
  String humi(getHumi(data));

  String strTemp = "";
  for (int i = 16; i < 21; i++)
    strTemp += data[i];

  String strHumi = "";
  for (int i = 35; i < 40; i++)
    strHumi += data[i];

  if (!strTemp.compareTo(temp) && !strHumi.compareTo(humi))
    return true;

  return false;
}

bool isPacketCorrect(String data, double temperature, double humidity) {
  String packet = "{\"Temperature\": ";
  packet += String(temperature);
  packet += ", \"Humidity\": ";
  packet += String(humidity);
  packet += "}";

  return !packet.compareTo(data) ? true : false;
}

/**
 * *WiFi
 */

void handleRootGet() {
  Data data = getData();
  String buff = rootPage(id, ssid, data.temperature, data.humidity);
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
 ** Send data to server
 */
void sendData(String data) {
  if (client.connect(SERVER_AZURE, HTTP_PORT)) {
    Serial.print("Connected - ");
    Serial.println(data); 

    client.println("POST /sensors/test HTTP/1.1");
    client.print("Host: ");
    client.println(SERVER_AZURE);
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