'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

var ObjectId = Schema.Types.ObjectId;
 
/**
 * Review Schema
 */
var ReviewSchema = new Schema({
    addedBy: {
        type: ObjectId,
        ref: 'User'
    },
    barName: String,
    barID: String,
    review: String,
    good: Number,
    bad: Number,
    rating: Number,
    timestamp: {
    	type: Date,
    	default: Date.now
    },
    
});

mongoose.model('Review', ReviewSchema);
