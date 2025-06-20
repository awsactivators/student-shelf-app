const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  });

  await transporter.sendMail({
    from: '"Student Shelf" <support@studentshelf.com>',
    to,
    subject,
    text
  });
};

module.exports = sendEmail;