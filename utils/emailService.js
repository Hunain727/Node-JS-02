const nodemailer = require('nodemailer');

const sendWelcomeEmail = async (toEmail, username) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"E-Store" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Welcome to Our E-Commerce Store!',
    html: `<h1>Welcome ${username}!</h1><p>Thank you for registering with us.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendWelcomeEmail };