'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users');
var forums = require('../../app/controllers/forums');

module.exports = function(app) {
	app.route('/forums')
		.get(forums.list)
		.post(users.requiresLogin, forums.create);

	app.route('/forums/:forumId')
		.get(forums.read)
		.put(users.requiresLogin, forums.hasAuthorization, forums.update)
		.delete(users.requiresLogin, forums.hasAuthorization, forums.delete);
		
	app.route('/forums/:forumId/post/:postId')
		.delete(users.requiresLogin, forums.hasAuthorization, forums.deletePost);

	app.param('forumId', forums.forumByID);
};

