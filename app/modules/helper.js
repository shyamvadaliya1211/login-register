'use strict';
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

exports.emailSend = (toEmail, subject, html) => {
    const smtpTransport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: 'shyamvadaliya786@gmail.com', // Sender Email
            clientId: '866383984072-ebs3j6h2juj98qh4dk0a6m25fne9vtan.apps.googleusercontent.com',
            clientSecret: 'P_mTjBCE8Kcs2vbM_BplUNf5',
            refreshToken: '1//04KBQ-fZ9d6P-CgYIARAAGAQSNwF-L9Ir8WhQEqCBgO_M4o-Lv6jC7XpncOHtu1Z8pYKR8hEApkqWyBYTuGbpD8_qO-HTvMMGr1o',
        },
    });

    const mailOptions = {
        from: 'shyamvadaliya786@gmail.com',
        to: toEmail,
        subject,
        generateTextFromHTML: true,
        html,
    };

    smtpTransport.sendMail(mailOptions, (error, response) => {
      smtpTransport.close();
    });
};
