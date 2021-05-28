#include "mbed.h"

PwmOut pwm1(PTC9);
PwmOut pwm2(PTC8);
PwmOut pwm3(PTA5);

DigitalOut pc1(PTE3);
DigitalOut pc2(PTE4);
DigitalOut pc3(PTE5);




// Timer init
void timerInit(void){
    SIM->SCGC6 |= 0x02000000; // enable clock to TPM0 
    SIM->SOPT2 |= 0x01000000; //use MCGFLLCLK as CNT clock //
    TPM1->SC = 0; // disable timer while configuring 
    TPM1->SC = 0x07; 
    TPM1->MOD = 0xFFFF; // max modulo value 
    TPM1->SC |= 0x80; // clear TOF 
    TPM1->SC |= 0x08; // enable timer free-running mode 

}


// onse second delay
void delayOneSec(void){
    int j;
    for(j = 0; j < 6000000; j++){
        // waits for one second
        while((TPM1->SC & 0x80) == 0) { } 
    }
}

void delayNSecond(int n){
    for(int i = 0; i < n; i++){
        delayOneSec();
        }

}




void servoActive(int servo, int dur){
    delayNSecond(1);
    switch(servo){
        case 1:
            pc1 = 1;
            delayNSecond(dur);
            pc1 = 0;            
            break;
        case 2:
            pc2 = 1;
            delayNSecond(dur);
            pc2 = 0; 
            break;
        case 3:
            pc3 = 1;
            delayNSecond(dur);
            pc3 = 0; 
            break;
        default:
            break;
        }
    delayNSecond(1);    
    }

int main() {
    timerInit();
    pwm1.period_ms(20);
    pwm1.write(0.1);
    pwm2.period_ms(20);
    pwm2.write(0.1);
    pwm3.period_ms(20);
    pwm3.write(0.1);   
    while(1){
        servoActive(1, 3);
        servoActive(2, 3);
        servoActive(3, 3);

        }
    
}
