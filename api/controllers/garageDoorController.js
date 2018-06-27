'use strict';
var rpiGpio = require ("rpi-gpio");
var rpio = require ("rpio");

const SENSOR_GPIO_ID = 10;
const RELAY_GPIO_ID = 7;

rpio.open(RELAY_GPIO_ID, rpio.INPUT, rpio.PULL_DOWN);

exports.readState = function (req, res) {
    console.log('readState');
    rpio.open(SENSOR_GPIO_ID, rpio.INPUT);
    res.json({sensor:rpio.read(SENSOR_GPIO_ID)});
};

exports.toggle = function (req, res) {
  console.log('Toggling door!');
  rpio.open(SENSOR_GPIO_ID, rpio.INPUT);
  var state = rpio.read(SENSOR_GPIO_ID);
  console.log('Current GPIO state is : ', state);

  rpio.open(RELAY_GPIO_ID, rpio.OUTPUT, rpio.HIGH);
  rpio.write(RELAY_GPIO_ID, rpio.LOW);
  rpio.msleep(200);
  rpio.write(RELAY_GPIO_ID, rpio.HIGH);

  rpio.msleep(200);
  res.json({status:"success"});
};

