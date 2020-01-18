'use strict';

/**
 * Module dependencies.
 */
var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;


var userSchema = new Schema({
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	status: Boolean,
});

mongoose.model('User', userSchema);