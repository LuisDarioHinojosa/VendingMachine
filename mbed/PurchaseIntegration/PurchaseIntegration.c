#include "mbed.h"
#include "TextLCD.h"
#include "Keypad.h"
#include "DHT11.h"

// PWM Init
PwmOut pwm1(PTC9);
PwmOut pwm2(PTC8);
PwmOut pwm3(PTA5);

// Transitor Pins init
DigitalOut pc1(PTE3);
DigitalOut pc2(PTE4);
DigitalOut pc3(PTE5);

//DigitalOut led(LED1);

// Initialize LCD Dysplay
TextLCD lcd(PTD0, PTD2, PTD4, PTD5, PTD6, PTD7, TextLCD::LCD16x2);
// Initialize Keypad
Keypad kpad(PTC4, PTC3, PTC0, PTC7, PTC11, PTC10, PTC6, PTC5);
// Inititalizt Temperature &Humidity Sensor
DHT11 d(PTA4);

// Pir Sensor Pin Init
DigitalIn alarm(PTC12, PullUp); //internal pull up
DigitalOut dispatchLed(PTC13);  // Support Pin (INDICATIVE LED)

void intro_0()
{
    lcd.cls();        // Borra el  LCD
    lcd.locate(3, 0); // Se posiciona en la Columna 3, Fila 0
    lcd.printf("BIENVENIDO ");
    lcd.locate(1, 1);
    lcd.printf("Vending Machine");
}

void metodo1()
{
    lcd.cls();        // Borra el  LCD
    lcd.locate(3, 0); // Se posiciona en la Columna 3, Fila 0
    lcd.printf("Metodo Pago: ");
    lcd.locate(1, 1);
    lcd.printf("Coins>*");
    lcd.locate(8, 1);
    lcd.printf("Card>0");
}

// timers and servo funcitons
// Timer init
void timerInit(void)
{
    SIM->SCGC6 |= 0x02000000; // enable clock to TPM0
    SIM->SOPT2 |= 0x01000000; //use MCGFLLCLK as CNT clock //
    TPM1->SC = 0;             // disable timer while configuring
    TPM1->SC = 0x07;
    TPM1->MOD = 0xFFFF; // max modulo value
    TPM1->SC |= 0x80;   // clear TOF
    TPM1->SC |= 0x08;   // enable timer free-running mode
}

// onse second delay
void delayOneSec(void)
{
    int j;
    for (j = 0; j < 6000000; j++)
    {
        // waits for one second
        while ((TPM1->SC & 0x80) == 0)
        {
        }
    }
}

void delayNSecond(int n)
{
    for (int i = 0; i < n; i++)
    {
        delayOneSec();
    }
}

void servoActive(int servo)
{
    delayNSecond(1);
    dispatchLed = 1;
    switch (servo)
    {
    case 1:
        wait(2);
        pc1 = 1;
        while (!alarm)
        {
        }
        //delayNSecond(dur);
        pc1 = 0;
        break;
    case 2:
        wait(2);
        pc2 = 1;
        while (!alarm)
        {
        }
        //delayNSecond(dur);
        pc2 = 0;
        break;
    case 3:
        wait(2);
        pc3 = 1;
        while (!alarm)
        {
        }
        //delayNSecond(dur);
        pc3 = 0;
        break;
    default:
        break;
    }
    dispatchLed = 0;
    delayNSecond(1);
}

void servosInit(void)
{
    pwm1.period_ms(20);
    pwm1.write(0.1);
    pwm2.period_ms(20);
    pwm2.write(0.1);
    pwm3.period_ms(20);
    pwm3.write(0.1);
}

// Hall Effect Sensor Functions:
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
    char key;
    int released = 1;
    timerInit();
    servosInit();
    converterInit();
    intro_0();
    wait_ms(2000);
    metodo1();
    /*
    lcd.locate(0,0);
    lcd.printf("A>Stack");
    lcd.locate(8,0);
    lcd.printf("#>Tem");
    lcd.locate(0,1);
    lcd.printf("C>HD");
    lcd.locate(8,1);
    lcd.printf("D>PROD");
    lcd.locate(3,0);
    */

    while (1)
    {

        key = kpad.ReadKey();

        if (key == '\0')
        {
            released = 1;
        }

        if ((key != '\0') && (released == 1))
        {
            released = 0;

            if (key == '*')
            {
                lcd.cls();
                lcd.locate(0, 0);
                lcd.printf("A>Stack");
                lcd.locate(8, 0);
                lcd.printf("B>Tem");
                lcd.locate(0, 1);
                lcd.printf("#>HD");
                lcd.locate(8, 1);
                lcd.printf("D>PROD");
                lcd.locate(3, 0);
            }
            else if (key == 'A')
            {
                lcd.cls();
                lcd.printf("Productos\n");
                lcd.printf("Load...");
                wait_ms(2000);
                lcd.cls();
                lcd.printf("Crujitos\n ");
                lcd.printf("$1");
                wait_ms(2000);
                lcd.cls();
                lcd.printf("Agua\n ");
                lcd.printf(" $2");
                wait_ms(2000);
                lcd.cls();
                lcd.printf("Oreo\n ");
                lcd.printf(" $3");
                wait_ms(2000);
                lcd.cls();
                lcd.printf("Presione--> *\n");
                lcd.printf("Para regresar");
            }
            else if (key == 'B')
            {

                lcd.cls();
                int s;
                s = d.readData();
                if (s != DHT11::OK)
                {
                    lcd.printf("Error");
                }
                else
                {
                    lcd.printf("Temperatura: %d", d.readTemperature());
                    lcd.printf("C");
                    lcd.locate(0, 1);
                    lcd.printf("Menu--> *");
                }
            }
            else if (key == '#')
            {
                lcd.cls();
                int s;
                s = d.readData();
                if (s != DHT11::OK)
                {
                    lcd.printf("Error");
                }
                else
                {
                    lcd.printf("Humedad: %d", d.readHumidity());
                    lcd.printf(" %");
                    lcd.locate(0, 1);
                    lcd.printf("Menu--> *");
                }
            }
            else if (key == 'D')
            {
                lcd.cls();
                lcd.printf("Choose ID");
                lcd.printf("Product");
            }

            else if (key == '1')
            {
                lcd.cls();
                lcd.printf("Selected ID-->1 ");
                wait_ms(2000);
                lcd.cls();
                lcd.printf("Oreo $3 \n ");
                lcd.printf("La lana paps\n");
                coinCounter(3);
                wait_ms(2000);
                lcd.cls();
                servoActive(1);
                lcd.printf("Despachado\n");
                lcd.locate(0, 1);
                lcd.printf("Menu-->*");
            }

            else if (key == '2')
            {
                lcd.cls();
                lcd.printf("Selected ID-->2 ");
                wait_ms(2000);
                lcd.cls();
                lcd.printf("Agua $2 \n ");
                lcd.printf("La lana paps\n");
                coinCounter(2);
                wait_ms(2000);
                lcd.cls();
                servoActive(2);
                lcd.printf("Despachado\n");
                lcd.locate(0, 1);
                lcd.printf("Menu-->*");
            }

            else if (key == '3')
            {
                lcd.cls();
                lcd.printf("Selected ID-->3 ");
                wait_ms(2000);
                lcd.cls();
                lcd.printf("Crujitos $1 \n ");
                lcd.printf("La lana paps\n");
                coinCounter(1);
                wait_ms(2000);
                lcd.cls();
                servoActive(3);

                lcd.printf("Despachado");
                lcd.locate(0, 1);
                lcd.printf("Menu-->*");
            }

            else if (key == '0')
            {
                lcd.cls();
                lcd.printf("Server online ");
                lcd.locate(0, 1);
                lcd.printf("vending.com ");
                wait_ms(2000);
                lcd.cls();
                lcd.printf("Esperando...");
                lcd.locate(0, 1);
                lcd.printf("pedido ");
            }
        }
    }
}
