'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Review = mongoose.model('Review'),
	bars = require('../../app/controllers/bars'),
	_ = require('lodash');

/**
 * Create a review
 */
exports.create = function(req, res) {
	var review = new Review(req.body);
	review.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			bars.addReview(review._id, review.barID, review.rating);
			res.jsonp(review);
		}
	});
};

/**
 * Show the current review
 */
exports.read = function(req, res) {
	res.jsonp(req.review);
};

/**
 * Update a review
 */
exports.update = function(req, res) {
	var review = req.review;

	review = _.extend(review, req.body);

	review.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(review);
		}
	});
};

/**
 * Delete a review
 */
exports.delete = function(req, res) {
	var review = req.review;

	review.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(review);
		}
	});
};

/**
 * List of Reviews
 */
exports.list = function(req, res) {
	Review.find().sort('-created').exec(function(err, reviews) {
		if (err) {
            console.log('review controller list error');
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(reviews);
		}
	});
};

/**
 * Review middleware
 */
exports.reviewByID = function(req, res, next, id) {
	Review.findById(id).exec(function(err, review) {
		if (err) return next(err);
		if (!review) return next(new Error('Failed to load review ' + id));
		req.review = review;
		next();
	});
};

/**
 * REview authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    /* TODO will have to add multiple authorizations for owner/follower/contributor
	if (req.review.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
    */
	next();
};
