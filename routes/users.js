var express = require('express');
var assert = require('assert');
var db = require('../db');

var CONSTS = require('../consts');

var router = express.Router();

var findAllUser = function (db, callback) {
	var collection = db.collection(CONSTS.USER_COLLECTION_NAME);

	collection.find({}).toArray(function (err, users) {
		assert.equal(err, null);
		callback(users);
	});
};

router.get('/', function (req, res) {
	findAllUser(db.get(), function (users) {
		res.send(users);
	});
});


module.exports = router;