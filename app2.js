const rpio = require('rpio');
const sleep = require('sleep');
const kp = require('keypress');

const RIGHT_FORWARD = 7
const RIGHT_BACKWARD = 11
const LEFT_FORWARD = 13
const LEFT_BACKWARD = 15

kp(process.stdin);

rpio.open(RIGHT_FORWARD, rpio.OUTPUT, rpio.LOW);
rpio.open(RIGHT_BACKWARD, rpio.OUTPUT, rpio.LOW);
rpio.open(LEFT_FORWARD, rpio.OUTPUT, rpio.LOW);
rpio.open(LEFT_BACKWARD, rpio.OUTPUT, rpio.LOW);

rpio.write(RIGHT_FORWARD, rpio.HIGH);
rpio.msleep(500);
rpio.write(RIGHT_FORWARD, rpio.LOW);

rpio.sleep(1);

rpio.write(RIGHT_BACKWARD, rpio.HIGH);
rpio.msleep(500);
rpio.write(RIGHT_BACKWARD, rpio.LOW);

rpio.sleep(1);

rpio.write(LEFT_FORWARD, rpio.HIGH);
rpio.msleep(500);
rpio.write(LEFT_FORWARD, rpio.LOW);

rpio.sleep(1);

rpio.write(LEFT_BACKWARD, rpio.HIGH);
rpio.msleep(500);
rpio.write(LEFT_BACKWARD, rpio.LOW);

rpio.sleep(1);

forward()
rpio.sleep(2)
stop()
backward()
rpio.sleep(2)
stop()

process.stdin.on('keypress', (ch, key) => {
    console.log(`got keypress ${key.name}`)
    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
    }

    switch (key.name) {
        case 'up':
        forward();
        break;
        case 'down':
        backward();
        break;
        case 'left':
        turnLeft();
        break;
        case 'right':
        turnRight();
        break;
        case 'space':
        stop();
        
    }
});





process.stdin.setRawMode(true);
process.stdin.resume();

function forward() {
    stop();
    rpio.write(RIGHT_FORWARD, rpio.HIGH);
    rpio.write(LEFT_FORWARD, rpio.HIGH);

}

function backward() {
    stop();
    rpio.write(RIGHT_BACKWARD, rpio.HIGH);
    rpio.write(LEFT_BACKWARD, rpio.HIGH);
}

function turnLeft() {
    stop();
    rpio.write(RIGHT_FORWARD, rpio.HIGH);
    rpio.write(LEFT_BACKWARD, rpio.HIGH);
}

function turnRight() {
    stop();
    rpio.write(LEFT_FORWARD, rpio.HIGH);
    rpio.write(RIGHT_BACKWARD, rpio.HIGH);
}

function stop() {
    rpio.write(RIGHT_FORWARD, rpio.LOW);
    rpio.write(LEFT_FORWARD, rpio.LOW);
    rpio.write(RIGHT_BACKWARD, rpio.LOW);
    rpio.write(LEFT_BACKWARD, rpio.LOW);
}

