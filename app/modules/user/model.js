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
});

mongoose.model('User', userSchema);