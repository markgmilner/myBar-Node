'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

var ObjectId = Schema.Types.ObjectId;
 
/**
 * Post Schema
 */
var PostDef = {
    text: String,
    timestamp: {
    	type: Date,
    	default: Date.now
    },
    createdBy: {
        type: ObjectId,
        ref: 'User'
    },
	posts: [PostDef],
};

/**
 * Forum Schema
 */
var ForumSchema = new Schema({
	name: {
		type: String,
		trim: true,
		validate: []
	},
	description: String,
    createdBy: {
        type: ObjectId,
        ref: 'User'
    },
    timestamp: {
    	type: Date,
    	default: Date.now
    },
    posts: [PostDef],
});

mongoose.model('Forum', ForumSchema);
