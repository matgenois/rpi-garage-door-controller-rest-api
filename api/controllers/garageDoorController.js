'use strict';
var rpiGpio = require ("rpi-gpio");
var rpio = require ("rpio");

const SENSOR_GPIO_ID = 10;
const RELAY_GPIO_ID = 7;

rpio.open(RELAY_GPIO_ID, rpio.INPUT, rpio.PULL_DOWN);

function readDoorState() {
    rpio.open(SENSOR_GPIO_ID, rpio.INPUT);
    var state = rpio.read(SENSOR_GPIO_ID);
    rpio.close(SENSOR_GPIO_ID);
    return state;
}

function toggle() {
  var state = readDoorState();
  console.log('Current GPIO state is : ', state);

  rpio.open(RELAY_GPIO_ID, rpio.OUTPUT, rpio.HIGH);
  rpio.write(RELAY_GPIO_ID, rpio.LOW);
  rpio.msleep(200);
  rpio.write(RELAY_GPIO_ID, rpio.HIGH);

  rpio.msleep(200);
  rpio.close(RELAY_GPIO_ID, rpio.PIN_PRESERVE);
}

exports.readState = function (req, res) {
    console.log('readState');
    res.json({sensor:readDoorState()});
};

exports.toggle = function (req, res) {
  console.log('Toggling door!');
  toggle();
  res.json({status:"success"});
};

exports.open = function(req, res) {
  var state = readDoorState();
  if (state) {
      res.json({status:"already open"});
  } else {
      toggle();
      res.json({status:"success"});
  }
};

exports.close = function(req, res) {
  var state = readDoorState();
  if (state) {
      res.json({status:"success"});
      toggle();
  } else {
      res.json({status:"already open"});
  }
};
