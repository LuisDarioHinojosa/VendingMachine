#include "mbed.h"
#include "TextLCD.h"

TextLCD lcd(PTD0, PTD2, PTD4, PTD5, PTD6, PTD7, TextLCD::LCD16x2);

void converterInit(void)
{

    SIM->SCGC5 |= 0x2000; // clock to PORTE

    PORTE->PCR[20] = 0; // PTE20 analog input

    SIM->SCGC6 |= 0x8000000; // clock to ADC0

    ADC0->SC2 &= ~0x40; // software trigger

    // clock div by 4, long sample time, single ended 10 bit, bus clock

    ADC0->CFG1 = 0x40 | 0x10 | 0x08 | 0x01;
}

// this functions uses KL25Z´channel zero to read from ky035 and return a lecture of magentic pole
int getMagneticPoleLecture(void)
{
    int lecture = 0;
    ADC0->SC1[0] = 0;
    while (!(ADC0->SC1[0] & 0x80))
    {
        // wait for conversion to finish
    }
    lecture = ADC0->R[0]; // obtain temp lecture | clear conversion flag
    return lecture;
}

// receibes a price and adds one each time the KY-035 sensor detects either a positive or a negative pole
void coinCounter(int price)
{
    lcd.cls();
    int count = 0;
    int lecture;
    do
    {
        lecture = getMagneticPoleLecture();

        if (((lecture < 350) && (lecture > 250)) || ((lecture < 1050) && (lecture > 1000)))
        {
            count += 1;
            lcd.cls();
            lcd.printf("Coin Detected");
            lcd.locate(0, 1);
            lcd.printf("Count: ");
            lcd.locate(6, 1);
            lcd.printf("%d", count);
            wait(3);
            lcd.cls();
        }
        else
        {
            lcd.cls();
            lcd.printf("Insert a Coin:");
            lcd.locate(0, 1);
            lcd.printf("Price: ");
            lcd.locate(6, 1);
            lcd.printf("%d", price);
            wait(0.5);
            lcd.cls();
        }
    } while (count < price);
    lcd.cls();
}

int main()
{
    int stuff = 3;
    converterInit();
    while (1)
    {

        coinCounter(stuff);
        lcd.cls();
        lcd.printf("Finished");
        wait(3);
        lcd.cls();
    }
}
