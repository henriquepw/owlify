
#include <LoRa.h>
#include <SPI.h>

void setup() {
  Serial.begin(9600);
  while (!Serial);

  Serial.println("LoRa Receiver");

  if (!LoRa.begin(915E6)) {
    Serial.println("Starting LoRa failed!");
    while (1);
  }
}

String  getString(){
  String aux = "";
 
  while(LoRa.available())
      aux += (char)LoRa.read();
  return aux;
}
double getTemp(String s){
  String temp = "";
  for(int i = 16, j = 0; i<21; i++, j++){
    temp += s[i];
  }
  double temp_d = temp.toDouble();
  return temp_d;
}

double getHumi(String s){
  String temp = "";
  for(int i = 35, j = 0; i<40; i++, j++){
    temp += s[i];
  }  
  double humi_d = temp.toDouble();
  return humi_d;
}
bool isNum(String data){
  double t = getTemp(data);
  double h = getHumi(data);
  String s_temp = "";
  for(int i = 16, j = 0; i<21; i++, j++){
    s_temp += data[i];
  }
  String s_humi = "";
  for(int i = 35, j = 0; i<40; i++, j++){
    s_humi += data[i];
  }
  String aux_temp(t);
  String aux_humi(h);
  if(!s_temp.compareTo(aux_temp)){
    if(!s_humi.compareTo(aux_humi)){
      return true; 
    }
    else{
      return false;
    }
  }
  else{
    return false;
  }
}
void loop() {
  
  int packetSize = LoRa.parsePacket();

  if(packetSize){
    String data = getString();
    if(isNum(data)){
      Serial.println(data);
    }
    else{
      Serial.println("ERROR!");
    }
   
  }
}
