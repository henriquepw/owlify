#include <dht.h>
#include <LoRa.h>
#include <SPI.h>

void setup() {
  Serial.begin(9600);
  while (!Serial);

  Serial.println("LoRa Receiver");

  if (!LoRa.begin(433E6)) {
    Serial.println("Starting LoRa failed!");
    while (1);
  }
}
void loop(){
  int packetSize = LoRa.parsePacket();
  if(packetSize){
    Serial.println("Packet Received");
    while(LoRa.available()){
      Serial.print((char)LoRa.read());
    }
    Serial.println();
  }
}
