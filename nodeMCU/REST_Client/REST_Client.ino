#include <ESP8266WiFi.h>
#include <ArduinoJson.h>
#include <Ticker.h>
#include <ESP8266HTTPClient.h>

// Important pins
#define led_wifi D4

// wifi setup info
String ssid = "INFINITUME681_2.4";
String pass = "3QtSv7HK1X";

// Server API
String ApiHost = "http://192.168.252.1:3443";

// Ticker variables
byte counter = 0;
byte maxt = 50;

Ticker blink_led;

// let ticker function
void blinckLed(){
  byte state = digitalRead(led_wifi);
  digitalWrite(led_wifi, !state);
  }


void WIFI_connection(String ssid,String password){
  blink_led.attach(0.2,blinckLed);
  WiFi.begin(ssid,password);
  while(WiFi.status() != WL_CONNECTED and counter < maxt){
    counter ++;
    delay(500);
    Serial.print(".");
    }
    
    blink_led.detach();
    
    if(counter < maxt){
      Serial.println("Connected to:");
      Serial.println(WiFi.SSID());
      Serial.println("IP:");
      Serial.println(WiFi.localIP());
      Serial.println("macAdress: ");
      Serial.println(WiFi.macAddress());
      }
    else{
      Serial.println("Connection Error D:");
      }
   
}




void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  WIFI_connection(ssid,pass);
}


void loop() {
  // put your main code here, to run repeatedly:
  if (WiFi.status() == WL_CONNECTED) { 
 
    HTTPClient http;  
 
    http.begin("http://192.168.1.73:3443/products"); 
    int httpCode = http.GET();                                  
 
    if (httpCode > 0) { //Check the returning code
 
      String payload = http.getString();  
      Serial.println(payload);           
 
    }
 
    http.end();   //Close connection
 
  }
}
