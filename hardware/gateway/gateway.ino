#include "ESP8266HTTPUpdateServer.h"
#include "ESP8266WebServer.h"
#include "ESP8266WiFi.h"
#include "WiFiClient.h"

#include "pages.h"
#include "env.h"
 
typedef struct {
  float temperature;
  float humidity;
} Data;

/*
 * Access point address
 */
IPAddress local_IP(192,168,4,22);
IPAddress local_gateway(192,168,4,9);
IPAddress local_subnet(255,255,255,0);

const char* local_ssid = "fibosensor";
const char* local_password = "12345678";

/*
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

/*
 * Starting access point network
 */
void initAP() {
  Serial.print("Configuring network... ");
  Serial.println(WiFi.softAPConfig(local_IP, local_gateway, local_subnet) ? "Ready" : "Failed!");

  Serial.print("Starting WiFi network... ");
  Serial.println(WiFi.softAP(local_ssid) ? "Ready" : "Failed!");

  Serial.print("IP address: ");
  Serial.println(WiFi.softAPIP());
  
  initServices();
}

void handleRootGet() {
  String buff = rootPage(1, "2");
  server.send(200, "text/html", buff);
}

void handleStatus() {
  String buff = statusPage(10, 80);
  server.send(200, "text/html", buff);
}

/*
 * Starting html pages
 */
void initServices() {
  upServer.setup(&server);
  server.on("/", HTTP_GET, handleRootGet);
  // server.on("/", HTTP_POST, handleRootPost);
  // server.on("/form", handleForm);
  server.on("/status", handleStatus);
  server.begin();
}

/*
 * Conecting to wifi network
 */
void connectWiFi(){
  Serial.print("Conecting to WiFi...");
  
  const char *ssid = SSID;
  const char *password = PASSWORD;
  
  //WiFi.mode(WIFI_AP_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.print(".");
  }

  Serial.print("Connected, IP: ");
  Serial.println(WiFi.localIP());
}

/*
 * get data from LoRa
 */
Data getData() {
  Data data;
  data.temperature = random(-10, 40);
  data.humidity = random(0, 100);

  return data;
}
