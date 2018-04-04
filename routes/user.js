var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

var CONTACTS_COLLECTION = 'user';

var db;

mongodb.MongoClient.connect('mongodb://heroku_cjng4mtc:o5g6v2q3v4ebeu6s8pob01vjf6@ds231719.mlab.com:31719/heroku_cjng4mtc', function (err, client) {
	if(err) {
		console.log(err);
		process.exit(1);
	}

	db = client.db('heroku_cjng4mt');

	console.log('Database connection ready');
});

router.get('/', function (req, res, next) {
	db.collection(CONTACTS_COLLECTION)
		.find()
		.then(function (result) {
			res.send(result);

			next();
		});
});

module.exports = router;