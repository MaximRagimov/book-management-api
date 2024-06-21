const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

module.exports = {
    sendConfirmationEmail(email) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Confirm your email',
            text: 'Please confirm your email by clicking on the following link.',
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) console.error(err);
            else console.log(`Email sent: ${info.response}`);
        });
    },
};