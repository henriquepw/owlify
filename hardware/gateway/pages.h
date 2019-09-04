/*
 * if refresh is true, refresh the page every 5 seconds
 */
String initPage(bool refresh) {
  String page = "<!DOCTYPE html> <html> <head>";
  page += "<meta charset=\"utf-8\" />";
  page += "<title>FiboSensor</title>";
  page += "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">";
  
  if(refresh) page += "<meta http-equiv=\"refresh\" content=\"5\">";
  
  page += "</head> <body>";

  return page;
}

String rootPage(long id, String networkWifi) {
  String page = initPage(false);
  
  page += "<p>Welcome</p>";

  page += "<form action=\"/form\" method=\"GET\">";
  page += "<table> <tr>";

  page += "<td>ID:</td>";
  page += "<td>" + String(id) + "</td>";
  page += "</tr> <tr>";

  page += "<td>WiFi network:</td>";
  page += "<td>" + String(networkWifi) + "</td>";
  page += "</tr> </table>";

  page += "<button>Update data</button>";
  
  page += "</body> </html>";

  return page;
}

String statusPage(float temperature, float humidity) {
  String page = initPage(true);
  
  page += "<table border=\"1px\">";
  
  page += "<tr> <td> temperature </td>";
  page += "<td> " + String(temperature) + " ºC </td>";
  
  page += "</tr>";
  
  page += "<tr> <td> humidity </td>";
  page += "<td> " + String(humidity) + " </td>";

  page += "</tr> </table> </body> </html>";

  return page;
}
