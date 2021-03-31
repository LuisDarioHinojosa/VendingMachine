#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <Ticker.h>

// Important pins
#define led_wifi D4

// wifi setup info
String ssid = "INFINITUME681_2.4";
String pass = "3QtSv7HK1X";

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

}
