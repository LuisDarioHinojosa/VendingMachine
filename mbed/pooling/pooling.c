#include "mbed.h"
#include "TextLCD.h"
#include "DHT11.h"


TextLCD lcd(PTD0,PTD2,PTD4,PTD5,PTD6,PTD7,TextLCD::LCD16x2);
DHT11 d(PTA4);
DigitalOut fan(PTB10);



void delayMs(int n) {
    int i;
    int j;
    for(i = 0 ; i < n; i++)
    for(j = 0 ; j < 7000; j++) { }
}


void setFan(int temp, int hum){
    const int tempT = 30;
    const int humT = 50;
    lcd.cls();
    if(  (temp >= tempT || hum >= humT)  && fan == 0){
        lcd.printf("FAN ON");
        fan = 1;
        }
        
    else if((temp >= tempT || hum >= humT) && fan == 1){
        lcd.printf("Wait");
        }       
    else if ( (temp < tempT || hum < humT) && fan == 1  ) {
        lcd.printf("FAN OFF");
        fan = 0;
        }
    else{
        lcd.printf("FAN OFF");
        fan = 0;
        }
    wait(1);
    lcd.cls();
    
    }

int main() {
    int temp, hum,s;

    while(1) {
        lcd.cls();
        lcd.printf("Pooling");
        wait(1);
        lcd.cls();
        
        s = d.readData();
        wait(1);
        if(s != DHT11::OK){
            lcd.cls();
            lcd.printf("Error");
            wait(1);
            lcd.cls();
            }
        else{
            temp = d.readTemperature();
            hum = d.readHumidity();
            lcd.cls();
            lcd.printf("%d",temp);
            lcd.locate(0,1);
            lcd.printf("%d",hum);
            wait(1);
            lcd.cls();
            setFan(temp,hum);
            }
        wait(0.5);
    }
}
