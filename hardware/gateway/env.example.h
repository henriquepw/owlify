/**
 * Create an env.h file
 */
const char* SSID = "Network-name";
const char* PASSWORD = "Network-password";

const int HTTP_PORT = 80;

typedef struct {
  int ip;
  String nodeId;
} Host;

Host hosts[] = {
  {1, "endnode id from server"}
};

IPAddress SERVER(192, 168, 1, 197); 
