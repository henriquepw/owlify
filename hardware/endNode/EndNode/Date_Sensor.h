#include <DHT.h>

#define DHT dht;
#define dht_pin A0;

int lista_pins[6] = {A0, A1, A2, A3, A4, A5};

class Data{
  public:
    String getTemp(){
      return (String)this->dht.readTemperature(true);
    }
    String getHumid(){
      return (String)this->dht.readHumidity();
    }
    void setPin(int n){
      this->dht.read(lista_pins[n]);
    }
};
