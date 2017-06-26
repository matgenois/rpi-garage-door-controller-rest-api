var express = require('express'),
    app = express(),
    port = process.env.PORT || 3051,
    bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/toggleDoorRoutes');
routes(app);

app.listen(port);

console.log('Garage door controller RESTful API server started on: ' + port);

