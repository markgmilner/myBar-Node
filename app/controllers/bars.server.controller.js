'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Bar = mongoose.model('Bar'),
	_ = require('lodash');

/**
 * Create a bar
 */
exports.create = function(req, res) {
	var bar = new Bar(req.body);

	bar.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bar);
		}
	});
};

/**
 * Show the current bar
 */
exports.read = function(req, res) {
	res.jsonp(req.bar);
};

/**
 * Add a review
 */
 exports.addReview = function(reviewID, barID, stars) {
 	console.log(reviewID+' '+ barID+' '+stars);
 	Bar.findByIdAndUpdate(barID, { $inc: { rating: stars }, $push: {reviews: reviewID}}, 
 		function (err, bar) {
			if (err) {
				return err;
			}
		});
 };

/**
 * Update a bar
 */
exports.update = function(req, res) {
	var bar = req.bar;

	bar = _.extend(bar, req.body);

	bar.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bar);
		}
	});
};

/**
 * Delete an bar
 */
exports.delete = function(req, res) {
	var bar = req.bar;

	bar.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bar);
		}
	});
};

/**
 * List of Bars
 */
exports.list = function(req, res) {
	Bar.find().sort('-created').exec(function(err, bars) {
		if (err) {
            console.log('bar controller list error');
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bars);
		}
	});
};

/**
 * Bar middleware
 */
exports.barByID = function(req, res, next, id) {
	Bar.findById(id).exec(function(err, bar) {
		if (err) return next(err);
		if (!bar) return next(new Error('Failed to load bar ' + id));
		req.bar = bar;
		next();
	});
};

/**
 * Bar authorization middleware
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
