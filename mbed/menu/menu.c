#include "mbed.h"
#include "TextLCD.h"
#include "Keypad.h"
#include "DHT11.h"

DigitalOut led(LED1);
TextLCD lcd(PTD0, PTD2, PTD4, PTD5, PTD6, PTD7, TextLCD::LCD16x2);
Keypad kpad(PTC4, PTC3, PTC0, PTC7, PTC11, PTC10, PTC6, PTC5);
DHT11 d(PTA4);
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

int main()
{
    char key;
    int released = 1;
    intro_0();
    wait_ms(15000);
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
                lcd.printf("$13.5");
                wait_ms(2000);
                lcd.cls();
                lcd.printf("Agua\n ");
                lcd.printf(" $10");
                wait_ms(2000);
                lcd.cls();
                lcd.printf("Oreo\n ");
                lcd.printf(" $9");
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
                lcd.printf("Oreo $9 \n ");
                lcd.printf("La lana paps\n");
                wait_ms(2000);
                lcd.cls();
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
                lcd.printf("Agua $10 \n ");
                lcd.printf("La lana paps\n");
                wait_ms(2000);
                lcd.cls();
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
                lcd.printf("Crujitos $13.5 \n ");
                lcd.printf("La lana paps\n");
                wait_ms(2000);
                lcd.cls();
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
