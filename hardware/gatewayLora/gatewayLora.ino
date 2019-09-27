#include <SPI.h>
#include "heltec.h"

/**
 * LoRa pinouts
 */
#define SS        18
#define LORA_RST  14
#define DIO0      26

#define BAND      915E6

String RxString;
String RxRSSI;

float packets_receive = 0.0;
float packets_error = 0.0;

void setup() {
  Serial.begin(9600);
  Heltec.begin(true /*DisplayEnable*/, true /*Heltec.LoRa*/, true /*Serial*/, true /*PABOOST*/, BAND);

  while (!Serial);
  Serial.println("LoRa Receiver");

  SPI.begin(5, 19, 27, 18);
  LoRa.setPins(SS, LORA_RST, DIO0);

  Heltec.display->init();

  Heltec.display->flipScreenVertically();
  Heltec.display->setFont(ArialMT_Plain_16);
  Heltec.display->drawString(0, 0, "Gateway");

  Heltec.display->display();

  Serial.println("\nConnected");
  LoRa.receive();
}

String getResponse() {
  String response = "";
 
  while(LoRa.available())
    response += (char) LoRa.read();

  return response;
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

  if(!strTemp.compareTo(temp) && !strHumi.compareTo(humi))
    return true;

  return false;
}

bool isPacketCorrect(String data, double temperature, double humidity) {
  String packet = "{\"Temperature\": ";
  packet += String(temperature);
  packet += ", \"Humidity\": ";
  packet += String(humidity);
  packet += "}";

  return packet.compareTo(data) ? false : true;
}

void loop() {
  int packetSize = LoRa.parsePacket();
  String data = "";

  if (packetSize) {
    packets_receive++;
    Serial.print("Received packet '");

    String data = getResponse();

    if (!isPacketCorrect(data, getTemp(data), getHumi(data)))
      packets_error++;

    Serial.println(data);
    Serial.print("Packets receive: ");
    Serial.print(packets_receive);
    Serial.print(", Packets error: ");
    Serial.print((packets_error/packets_receive)*100);
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

  delay(500);
}
