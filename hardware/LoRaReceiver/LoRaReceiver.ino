#include <LoRa.h>
#include <SPI.h>

float packets_receive = 0.0;
float packets_error = 0.0;

String getString() {
  String aux = "";
 
  while(LoRa.available())
      aux += (char)LoRa.read();
  return aux;
}

double getTemp(String s) {
  String temp = "";
  for(int i = 16, j = 0; i<21; i++, j++){
    temp += s[i];
  }
  double temp_d = temp.toDouble();
  return temp_d;
}

double getHumi(String s) {
  String temp = "";
  for(int i = 35, j = 0; i<40; i++, j++){
    temp += s[i];
  }  
  double humi_d = temp.toDouble();
  return humi_d;
}

bool isNum(String data) {
  double t = getTemp(data);
  double h = getHumi(data);

  String s_temp = "";
  for(int i = 16, j = 0; i < 21; i++, j++) {
    s_temp += data[i];
  }

  String s_humi = "";
  for(int i = 35, j = 0; i < 40; i++, j++) {
    s_humi += data[i];
  }
  
  String aux_temp(t);
  String aux_humi(h);
  
  if(!s_temp.compareTo(aux_temp)){
    if(!s_humi.compareTo(aux_humi)){
      return true;
    }
  }

  return false;
}

bool packet_correct(String data, double temp, double humi) {
  String Default("{\"Temperature\": ");
  
  Default += String(temp);
  Default += ", \"Humidity\": ";
  Default += String(humi);
  Default += "}";

  if (!Default.compareTo(data)){
    return true;
  }
  
  return false;
}

void setup() {
  Serial.begin(9600);
  while (!Serial);

  Serial.println("LoRa Receiver");

  if (!LoRa.begin(915E6)) {
    Serial.println("Starting LoRa failed!");
    while (1);
  }
}

void loop() {
  int packetSize = LoRa.parsePacket();

  if(packetSize){
    packets_receive++;
    String data = getString();

    if(!packet_correct(data, getTemp(data), getHumi(data))){
      packets_error++;
    }  
    
    Serial.println(data);
    Serial.print("Packets receive: ");
    Serial.print(packets_receive);
    Serial.print(", Packets error: ");
    Serial.print((packets_error/packets_receive)*100);
    Serial.println("%");
  }
}
