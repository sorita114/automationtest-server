var express = require('express');
var login = require('./routes/login');
var db = require('./db');
var CONSTS = require('./consts');

var bodyParser = require('body-parser');
var timeout = require('connect-timeout');

var app = express();

db.connect(CONSTS.DB_URI, CONSTS.DB_NAME, function (err) {
	if(err) {
		console.log(err);
		process.exit(1);
	}
});

app.use(timeout('20s'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
});

module.exports = app;
