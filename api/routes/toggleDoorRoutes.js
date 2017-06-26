'use strict';
module.exports = function(app) {
    var garageDoor = require('../controllers/garageDoorController');


    // todoList Routes
    app.route('/garage/door/')
        .post(garageDoor.toggle);


    app.route('/garage/door/')
        .get(garageDoor.readState);
};