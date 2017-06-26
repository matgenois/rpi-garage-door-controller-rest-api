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
    /*rpiGpio.setup(SENSOR_GPIO_ID, rpiGpio.DIR_IN, function(err) {
        if (err) {
            console.log('error : ', err);
            res.send(err);
        } else {
            console.log('gpio ' + SENSOR_GPIO_ID + ' is setup. reading state...');
            rpiGpio.read(SENSOR_GPIO_ID, function(err, readRes) {
                if (err) {
                    console.log('error on read', err);
                    res.send(err);
                } else {
                    res.json({sensor:readRes});
                }
            });
        }
    });*/
};

exports.toggle = function (req, res) {
  console.log('Toggling door!');
  rpio.open(SENSOR_GPIO_ID, rpio.INPUT);
  var state = rpio.read(SENSOR_GPIO_ID);
  console.log('Current GPIO state is : ', state);
  if (false)
  {
    console.log('GPIO is low. Writing HIGH!');
    rpio.open(RELAY_GPIO_ID, rpio.OUTPUT, rpio.LOW);
    rpio.write(RELAY_GPIO_ID, rpio.HIGH);
  } else {
    console.log('GPIO is high, Writing LOW!');
    rpio.open(RELAY_GPIO_ID, rpio.OUTPUT, rpio.HIGH);
    rpio.write(RELAY_GPIO_ID, rpio.LOW);
    rpio.msleep(200);
    rpio.write(RELAY_GPIO_ID, rpio.HIGH);
  }


  //rpio.open(RELAY_GPIO_ID, rpio.INPUT, rpio.PULL_DOWN);
  //rpio.poll(RELAY_GPIO_ID, function(pin){
    //var state = rpio.read(pin) ? 'pressed' : 'released';
    //console.log('state:', state);
  //});


rpio.msleep(200);
res.json({status:"success"});
};

