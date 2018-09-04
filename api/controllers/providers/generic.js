'use strict';
var rpio = require ("rpio");

const SENSOR_GPIO_ID = 10;
const RELAY_GPIO_ID = 7;
const RELAY_SAFETY_GPIO_ID = 8;

rpio.open(RELAY_GPIO_ID, rpio.INPUT, rpio.PULL_DOWN);
rpio.open(RELAY_SAFETY_GPIO_ID, rpio.INPUT, rpio.PULL_DOWN);

exports.readState = function () {
    rpio.open(SENSOR_GPIO_ID, rpio.INPUT);
    var state = rpio.read(SENSOR_GPIO_ID);
    rpio.close(SENSOR_GPIO_ID);
    return state;
};

exports.toggle = function () {
  var state = readDoorState();
  console.log('Current GPIO state is : ', state);

  rpio.open(RELAY_GPIO_ID, rpio.OUTPUT, rpio.HIGH);
  rpio.write(RELAY_GPIO_ID, rpio.LOW);
  rpio.msleep(200);
  rpio.write(RELAY_GPIO_ID, rpio.HIGH);

  rpio.msleep(200);
  rpio.close(RELAY_GPIO_ID, rpio.PIN_PRESERVE);
};

