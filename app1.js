const gpio = require('rpi-gpio');

// gpio.setMode(gpio.MODE_RPI);
// gpio.setup(7,gpio.DIR_OUT);
// gpio.setup(11,gpio.DIR_OUT);
// gpio.setup(13,gpio.DIR_OUT);
// gpio.setup(15,gpio.DIR_OUT);

// setPin(gpio, 7, false);
// setPin(gpio, 11, false);
// setPin(gpio, 13, false);
// setPin(gpio, 15, false);

gpio.destroy()

function setPin(gpio, pinNo, value) {
    gpio.write(pinNo, value, (err) => {
        if (err) {
            console.log(`Error writing ${value} to pin ${pinNo}}`)
            console.log(err)
        } else {
            console.log(`set pin ${pinNo} to ${value}`)
        }
    });
}
