'use strict';

var garageDoorProvider = require('providers/generic.js');

exports.readState = function (req, res) {
    console.log('readState');
    res.json({sensor:garageDoorProvider.readState()});
};

exports.toggle = function (req, res) {
  console.log('Toggling door!');
  garageDoorProvider.toggle();
  res.json({status:"success"});
};

exports.open = function(req, res) {
  var state = garageDoorProvider.readState();
  if (state) {
      res.json({status:"already open"});
  } else {
    garageDoorProvider.toggle();
      res.json({status:"success"});
  }
};

exports.close = function(req, res) {
  var state = garageDoorProvider.readState();
  if (state) {
      res.json({status:"success"});
      garageDoorProvider.toggle();
  } else {
      res.json({status:"already open"});
  }
};
