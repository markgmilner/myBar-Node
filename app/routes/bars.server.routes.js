'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	bars = require('../../app/controllers/bars');

module.exports = function(app) {
	app.route('/bars')
		.get(bars.list)
		.post(users.requiresLogin, bars.create);

	app.route('/bars/:barId')
		.get(bars.read)
		.put(users.requiresLogin, bars.hasAuthorization, bars.update)
		.delete(users.requiresLogin, bars.hasAuthorization, bars.delete);

	app.param('barId', bars.barByID);
};

