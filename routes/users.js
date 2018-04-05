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

var findUser = function (db, email, callback) {
	var collection = db.collection(CONSTS.USER_COLLECTION_NAME);

	collection.find({
		email: email
	}).toArray(function (err, user) {
		assert.equal(err, null);
		callback(user);
	});
};

router.get('/', function (req, res) {
	findAllUser(db.get(), function (users) {
		res.send(users);
	});
});

router.post('/', function (req, res) {
	res.send(req);
});


module.exports = router;