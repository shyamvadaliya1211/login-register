'use strict';
const nodemailer = require('nodemailer');

exports.emailSend = () => {
        // let testAccount = await nodemailer.createTestAccount();
        
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'vadaliyashyam@gmail.com',
                pass: 'mahasweta1211'
            }
        });
        
        // send mail with defined transport object
        let info = transporter.sendMail({
            from: 'vadaliyashyam@gmail.com', // sender address
            to: 'vadaliyashyam@gmail.com', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world?', // plain text body
            html: '<b>Hello world?</b>' // html body
        });
        console.log('Message sent: %s', info);
};
