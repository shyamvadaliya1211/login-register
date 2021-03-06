const mongoose = require('mongoose');
const request = require('request');
const userModel = mongoose.model('User');

const helperCtr = require('../helper');

exports.register = (req, res) => {
	console.log('>>>>>>>>>>>>>>>>> req.body', req.body);

	userModel.find({
		email: req.body.email,
	}).exec((err, userData) => {
		if (err) {
			res.json({
				status: false,
				msg: 'Some error, Please try again.',
			});
			return;
		}

		if (userData && userData.length) {
			res.json({
				status: false,
				msg: 'Email is already register.',
			});
			return;
		}


		//
		req.body.status = false;
        const user = new userModel(req.body);

        // because we set our user.provider to local our models/user.js validation will always be true
        req.assert('firstName', 'You must enter a firstname').notEmpty();
        req.assert('lastName', 'You must enter a lastname').notEmpty();
        req.assert('email', 'You must enter a valid email address').isEmail();
        req.assert('password', 'You must enter a password').notEmpty();

        //
        var errors = req.validationErrors();

        //
        if (errors) {
            return res.status(400).send(errors);
        }

        user.save(function(err, result) {
        	if (err) {
        		res.json({
					status: false,
					msg: 'Some error, Please try again.',
				});
				return;
        	}
        	const activeLink = 'http://' + req.headers.host + '/user/invitation-confirm-email/' + result._id;
        	const emailBody = `<a href="${activeLink}" target="_blank"> click here </a> OR Copy to link <br> ${activeLink}`;
        	helperCtr.emailSend(req.body.email, 'User Register Successfully', emailBody);
        	res.json({
        		status: true,
        		msg: 'User register successfully.',
        	});
        });


	});
};
