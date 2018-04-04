var MongoClient = require('mongodb').MongoClient;

var state = {
	db : null,
	client : null
};

module.exports.connect = function (url, dbName, done) {
	if(state.client) {
		return done();
	}

	MongoClient.connect(url, function (err, client) {
		if(err) {
			return done(err);
		}
		console.log('Connected correctly to server');

		state.client = client;
		state.db = client.db(dbName);
		done();
	});
};

module.exports.get = function () {
	return state.db;
};

module.exports.close = function () {
	if(state.client) {
		state.client.close();
	}
};

