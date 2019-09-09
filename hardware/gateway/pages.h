String initPage(bool refresh) {
  String page = "<!DOCTYPE html><html lang=en><head><meta charset=\"utf-8\"/>";
  page += "<meta name=viewport content=\"width=device-width, initial-scale=1\">";
  page += "<meta http-equiv=X-UA-Compatible content=\"ie=edge\">";
  
  // if refresh is true, refresh the page every 5 seconds
  if(refresh) page += "<meta http-equiv=refresh content=5>";
  
  page += "<title>name-here</title>";
  page += "</head> <body>";

  return page;
}

String rootPage(long id, String networkWifi, float temperature, float humidity) {
  String page = initPage(true);
  
  page +="<div class=root><h1>name-here</h1><ul><li><strong>ID: </strong><p>";
  page += id;
  page += "</p></li><li><strong>Network: </strong><p>";
  page += networkWifi;
  page += "</p></li><li><strong>Temperature: </strong><p>"; 
  page += temperature;
  page += " ºC</p></li><li><strong>Humidity: </strong><p>"; 
  page += humidity;
  page += " %</p></li></ul><button type=button onclick=\"window.location.href='/settings'\">Settings</button></div></body><style>*{margin:0;padding:0;outline:0;font-family:sans-serif;color:#333}html,body{width:100%;height:100%;font-size:20px}body{display:flex;align-items:center;justify-content:center;background:#f3f3f3}.root h1{text-align:center}button{width:100%;height:42px;border:0;border-radius:4px;cursor:pointer;text-transform:uppercase;font-weight:600;background:#81c9e0;box-shadow:1px 1px 10px rgba(0,0,0,0.3);transition:.2s}button:hover{box-shadow:1px 1px 10px rgba(0,0,0,0.5);background:#69c3e0}button:active{box-shadow:1px 1px 10px rgba(0,0,0,0.2);transform:translate(1px,1px)}.root{width:100%;max-width:300px;margin:auto;padding:20px;border-radius:4px}.root ul{list-style:none;padding:10px 0 20px}.root ul li{display:flex;justify-content:space-between;margin:20px 0}</style></html>";

  return page;
}

String settingsPage() {
  String page = initPage(false);

  page+= "<div class=root><h1>Settings</h1><form action=/ method=POST><input type=text name=id id=id placeholder=ID><input type=text name=network id=network placeholder=\"Network name\"><input type=password name=password id=password placeholder=\"Network password\"><button type=submit>Save</button></form><button type=button onclick=\"window.location.href='/'\">Back</button></div></body><style>*{margin:0;padding:0;outline:0;font-family:sans-serif;color:#333}html,body{width:100%;height:100%;font-size:20px}body{display:flex;align-items:center;justify-content:center;background:#f3f3f3}h1{text-align:center;margin-bottom:15px}button{width:100%;height:42px;border:0;border-radius:4px;cursor:pointer;text-transform:uppercase;font-weight:600;background:#81c9e0;box-shadow:1px 1px 10px rgba(0,0,0,0.3);transition:.2s;margin-top:20px}button:hover{box-shadow:1px 1px 10px rgba(0,0,0,0.5);background:#69c3e0}button:active{box-shadow:1px 1px 10px rgba(0,0,0,0.2);transform:translate(1px,1px)}.root{margin:auto;padding:20px;border-radius:4px;width:100%;max-width:300px}.root form{display:flex;flex-direction:column}.root form input{position:relative;border:0;height:32px;padding:0 5px;margin:15px 0;outline:0;font-size:.8rem;background:transparent;border-bottom:2px solid #ccc;transition:.2s}.root form input::after{content:\" \";position:absolute;height:10px;width:100%;background:#000}.root form input:focus{border-color:#69c3e0}</style></html>";

  return page;
}
