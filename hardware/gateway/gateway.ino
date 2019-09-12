#include "ESP8266HTTPUpdateServer.h"
#include "ESP8266WebServer.h"
#include "ESP8266WiFi.h"
#include "WiFiClient.h"

#include "EEPROM.h"

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
 * Access point address
 */
IPAddress LOCAL_IP(192,168,4,22);
IPAddress LOCAL_GATEWAY(192,168,4,9);
IPAddress LOCAL_SUBNET(255,255,255,0);

const char* LOCAL_SSID = "Panaceia";
const char* LOCAL_PASSWORD = "12345678";

int id = -1;
String ssid = SSID;
String password = PASSWORD;

/**
 * Server
 */ 
ESP8266WebServer server (80);
ESP8266HTTPUpdateServer upServer;

void setup() {
  Serial.begin(9600);
  Serial.println();

  initAP();
  connectWiFi();
}

void loop () {
  server.handleClient();
}

/**
 * @param init   memory position on EEPROM
 */
String EEPROMReadString(int init) {
  String value = "";
  int len = EEPROM.read(init);
  
  for(int i = 0; i < len; i++) 
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

  for(int i = 0; i < len; i++)
    EEPROM.write(init + i + 1, value[i]);
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

void handleRootGet() {
  Data data = getData();
  String buff = rootPage(id, ssid, data.temperature, data.humidity);
  server.send(200, "text/html", buff);
}

void handleRootPost() {
  if (server.hasArg("id") && server.hasArg("network") && server.hasArg("password")) {
    EEPROM.begin(200);

    EEPROM.write(0, 1); // condition

    if(server.arg("id").length() > 0) {
      EEPROM.write(1, server.arg("id").toInt()); // id
      id = EEPROM.read(1);
      Serial.println(id);
    }
    
    if(server.arg("network").length() > 0) {
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
  upServer.setup(&server);
  
  server.on("/", HTTP_GET, handleRootGet);
  server.on("/", HTTP_POST, handleRootPost);
  server.on("/settings", handleSettings);

  server.begin();
}

/**
 * Conecting to wifi network
 * TODO: escape from the loop if not connected a determined time
 */
void connectWiFi() {
  Serial.print("Conecting to WiFi...");
  
  WiFi.mode(WIFI_AP_STA);
  WiFi.begin(ssid, password);

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
 * TODO: get data from LoRa
 */
Data getData() {
  Data data;
  data.temperature = random(-10, 40);
  data.humidity = random(0, 100);

  return data;
}
