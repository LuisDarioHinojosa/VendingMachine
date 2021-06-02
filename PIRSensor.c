#include "mbed.h"

InterruptIn alarm(PTD4);
DigitalOut led(LED1);
DigitalOut flash(LED4);

void flip(){
    led = !led;
}

int main() {
    alarm.mode(PullUp);
    wait(2);
    alarm.fall(&flip);
    
    while(1) {
        flash = !flash;
        wait(0.25);
    }
}
