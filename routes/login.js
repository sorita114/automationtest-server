var express = require('express');
var db = require('../db');
var CONSTS = require('../consts');

var router = express.Router();

router.post('/', function (req, res) {
	var collection = db.get().collection(CONSTS.USER_COLLECTION_NAME);

	collection.find({
		email: decodeURIComponent(req.body.email)
	}).toArray(function (err, user) {
		if(err) {
			throw err;
		}

		if(user.length === 0) {
			res.status(404)
				.send('not exsit user')
				.end();
		} else {
			if(user[0].password === req.body.password) {
				res.status(200)
					.json({
						result: true,
						message: 'success'
					})
					.end();
			} else {
				res.status(200)
					.json({
						result: false,
						message: 'wrong password'
					})
					.end();
			}
		}
	});
});

module.exports = router;