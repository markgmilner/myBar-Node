'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	bars = require('../../app/controllers/bars'),
	reviews = require('../../app/controllers/reviews');

module.exports = function(app) {
	app.route('/reviews')
		.get(reviews.list)
		.post(users.requiresLogin, reviews.create);

	app.route('/reviews/:reviewId')
		.get(reviews.read)
		.put(users.requiresLogin, reviews.hasAuthorization, reviews.update)
		.delete(users.requiresLogin, reviews.hasAuthorization, reviews.delete);

	app.param('reviewId', reviews.reviewByID);
};

