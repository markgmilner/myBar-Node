'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

var ObjectId = Schema.Types.ObjectId;
 
/**
 * Day Schema
 */
var DayDef = {
    best: Boolean,
    noHH: Boolean,
    isClosed: Boolean,
    happyHour: [{start: String, end: String, _id: false}],
    open: String,
    close: String
};

/**
 * Bar Schema
 */
var BarSchema = new Schema({
	name: {
		type: String,
		trim: true,
		validate: []
	},
    addedBy: {
        type: ObjectId,
        ref: 'User'
    },
    price: Number,
    atmosphere: [String],
    type: [String],
    address: {
        formattedAddress : String,
        street : String,
        city : String,
        state : String,
        zip : String,
        neighborhood : String,
        latCoord : Number,
        longCoord : Number
    },
    deal: String,
    phone: String,
    website: String,
    instagram: String,
    twitter: String,
    monday: DayDef,
    tuesday: DayDef,
    wednesday: DayDef,
    thursday: DayDef,
    friday: DayDef,
    saturday: DayDef,
    sunday: DayDef,
    star1: Number,
    star2: Number,
    star3: Number,
    star4: Number,
    star5: Number,
    reviews: [{
    	type: ObjectId,
    	ref: 'Review'
    }],
    tv: Boolean,
    wifi: Boolean,
    outdoor: Boolean,
});

mongoose.model('Bar', BarSchema);
