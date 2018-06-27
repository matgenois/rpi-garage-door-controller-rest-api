'use strict';
module.exports = function(app) {
    var garageDoor = require('../controllers/garageDoorController');


    // todoList Routes
    app.route('/garage/door/')
        .post(garageDoor.toggle);

    // todoList Routes
    app.route('/garage/door/open')
        .post(garageDoor.open);

    // todoList Routes
    app.route('/garage/door/close')
        .post(garageDoor.close);


    app.route('/garage/door/')
        .get(garageDoor.readState);
};
