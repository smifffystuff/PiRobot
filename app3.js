const rpio = require('rpio');
const sleep = require('sleep');
const NanoTimer = require('nanotimer');

const TRIGGER = 21;
const ECHO = 19;
const BUZZER = 8;

rpio.open(TRIGGER, rpio.OUTPUT, rpio.LOW);
rpio.open(ECHO, rpio.INPUT);
rpio.open(BUZZER, rpio.OUTPUT, rpio.LOW);

soundBuzzer();

let timerObj = new NanoTimer();
let pulseEnd;
let pulseDuration;
let buzzerInterval = null;
let currentBeepInterval = 0;
let curDir = 'stop';

let check = setTimeout(checkDistance, 2000);

function checkDistance() {
    console.log("Mesauring distance");
    rpio.write(TRIGGER, rpio.HIGH);
    rpio.sleep(0.00001);
    

    pulseDuration = timerObj.time(doEcho, '', 's') / 2

    // pulseDuration = pulseEnd - pulseTime;
    // console.log(`Pulse duration = ${pulseDuration}`)
    const distance = pulseDuration * 17150;
    // console.log(`Distance = ${distance}`);
    if (distance <= 5) {
        if (currentBeepInterval !== 100) {
            console.log('Critical!');
            if (buzzerInterval) clearInterval(buzzerInterval);
            currentBeepInterval = 100;
            buzzerInterval = setInterval(soundBuzzer, currentBeepInterval);
        } 
    } else if (distance <= 10) {
        if (currentBeepInterval !== 200) {
            console.log('Dangerous!');
            if (buzzerInterval) clearInterval(buzzerInterval);
            currentBeepInterval = 200;
            buzzerInterval = setInterval(soundBuzzer, currentBeepInterval);
        } 
       
    } else if (distance <= 15) {
        if (currentBeepInterval !== 300) {
            console.log('Getting Close!');
            if (buzzerInterval) clearInterval(buzzerInterval);
            currentBeepInterval = 300;
            buzzerInterval = setInterval(soundBuzzer, currentBeepInterval);
        } 
    } else if (distance <= 20) {
        if (currentBeepInterval !== 400) {
            console.log('Warning!');
            if (buzzerInterval) clearInterval(buzzerInterval);
            currentBeepInterval = 400;
            buzzerInterval = setInterval(soundBuzzer, currentBeepInterval);
        } 
    } else {
        if (buzzerInterval) clearInterval(buzzerInterval);
        currentBeepInterval = 0
        rpio.write(BUZZER, rpio.LOW);
    }

    check = setTimeout(checkDistance, 500);
}

function doEcho() {
    rpio.write(TRIGGER, rpio.LOW);

    while (!rpio.read(ECHO)) {
        // pulseTime = (new Date()).getTime();
        timerObj = new NanoTimer();
    }

    while (rpio.read(ECHO)) {
        
    }
}

function soundBuzzer() {
    rpio.write(BUZZER, rpio.HIGH);
    rpio.msleep(50);
    rpio.write(BUZZER, rpio.LOW);

}
