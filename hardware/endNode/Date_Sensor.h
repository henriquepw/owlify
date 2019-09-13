#include <dht.h>

#define DHT dht;
#define dht_pin A0;

int lista_pins[6] = {A0, A1, A2, A3, A4, A5};

class Date{
  private:
    dht date;
  public:
    String getTemp() {
      return (String) this->date.temperature;
    }
    String getHumid() {
      return (String) this->date.humidity;
    }
    void setPin(int n) {
      this->date.read11(lista_pins[n]);
    }
};
