'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Forum = mongoose.model('Forum'),
	_ = require('lodash');

/**
 * Create a forum
 */
exports.create = function(req, res) {
	var forum = new Forum(req.body);

	forum.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(forum);
		}
	});
};

/**
 * Show the current forum
 */
exports.read = function(req, res) {
	Forum.findOne({_id:req.forum._id})
		.exec(function (err, forum){
			res.jsonp(forum);
		});
	
};
/*
 * Remove a post
 */ 
 exports.deletePost = function (req, res){
 	Forum.findByIdAndUpdate(req.forum._id, { $pull: {posts: {timestamp: req.params.postId}}},
 		function (err){
 			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(req.forum);
			}
 		});
 };
 
/**
 * Update a forum
 */
exports.update = function(req, res) {
	var forum = req.forum;
	forum = _.extend(forum, req.body);

	forum.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(forum);
		}
	});
};

/**
 * Delete an forum
 */
exports.delete = function(req, res) {
	var forum = req.forum;

	forum.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(forum);
		}
	});
};

/**
 * List of Forums
 */
exports.list = function(req, res) {
	Forum.find().sort('-created').exec(function(err, forums) {
		if (err) {
            console.log('forum controller list error');
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(forums);
		}
	});
};

/**
 * forum middleware
 */
exports.forumByID = function(req, res, next, id) {
	Forum.findById(id).exec(function(err, forum) {
		if (err) return next(err);
		if (!forum) return next(new Error('Failed to load forum ' + id));
		req.forum = forum;
		next();
	});
};

/**
 * Forum authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    /* TODO will have to add multiple authorizations for owner/follower/contributor
	if (req.bar.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
    */
	next();
};
