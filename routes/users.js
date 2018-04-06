var assert = require('assert');
var express = require('express');
var db = require('../db');
var CONSTS = require('../consts');

var router = express.Router();

var findUser = function (email, callback) {
	console.log('findUser');
	try {
		var collection = db.collection(CONSTS.USER_COLLECTION_NAME);

		collection.find({
			email: email
		}).toArray(function (err, user) {
			console.log(user);
			assert.equal(err, null);
			callback(user);
		});
	} catch (err) {
		throw err;
	}
};

var insertUser = function (email, password, callback) {
	console.log('insert');
	try {
		var collection = db.collection(CONSTS.USER_COLLECTION_NAME);

		collection.insert({
			email: email,
			password: password
		}, function (err, res) {
			if (err) {
				throw err;
			}

			callback();
		});
	} catch (err) {
		throw err;
	}
};

router.post('/', function (req, res) {
	console.log('post!');
	findUser(req.body.email, function (user) {
		if(user.length > 0) {
			res.status(500).send('exit email').end();
		} else {
			insertUser(req.body.email, req.body.password, function () {
				res.status(200).send('success insert user').end();
			});
		}
	});
});


module.exports = router;