#include <dht.h>

#define DHT dht;

int list_pins[6] = {A0, A1, A2, A3, A4, A5};

class Data {
  private:
    dht data;
  public:
    String getTemp() {
      return (String) this->data.temperature;
    }

    String getHumid() {
      return (String) this->data.humidity;
    }

    void setPin(int n) {
      this->data.read11(list_pins[n]);
    }
};
