#include "mbed.h"
#include "TextLCD.h"

TextLCD lcd(PTD0, PTD2, PTD4, PTD5, PTD6, PTD7, TextLCD::LCD16x2);

void converterInit(void)
{
    //PORTE->PCR[20] = 0x000;
    AnalogIn mag(PTE20);
    ADC0->SC2 &= ~0x40;                     // 10111111 for soft trigger
    ADC0->CFG1 = 0x40 | 0x10 | 0x04 | 0x00; // enable clock & 12 bit divider
}

int main()
{
    int stuff = 0;
    converterInit();
    while (1)
    {
        wait(1);
        lcd.cls();
        lcd.printf("Magnetic");
        wait(1);
        lcd.cls();

        ADC0->SC1[0] = 0;
        while (!(ADC0->SC1[0] & 0x80))
        {
            // wait for conversion to finish
        }
        stuff = ADC0->R[0]; // obtain temp lecture | clear conversion flag
        wait(1);
        lcd.printf("%d", stuff);
        wait(1);
        lcd.cls();
    }
}

/*
void converterInit(void)
{
    SIM->SCGC6 |= 0x8000000; // bit 27 to enable clock
    ADC0->SC2 &= ~0x40; // 10111111 for soft trigger
    ADC0->CFG1 = 0x40 | 0x10 | 0x04 | 0x00; // enable clock & 12 bit divider
}



int main() {
    
    int stuff = 0;
    converterInit();
    while(1) {
        wait(1);
        lcd.cls();
        lcd.printf("Magnetic");
        wait(1);
        lcd.cls();
        
        
        ADC0->SC1[0] = 26; 
        while(!(ADC0->SC1[0] & 0x80)) { 
         // wait for conversion to finish
        } 
        stuff = ADC0->R[0]; // obtain temp lecture | clear conversion flag
        wait(1);
        lcd.printf("%d",stuff);
        wait(1);
        lcd.cls();

    }
}
*/