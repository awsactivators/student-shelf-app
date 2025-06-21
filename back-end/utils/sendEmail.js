const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, htmlContent) => {
  const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  });

  await transporter.sendMail({
    from: `"Student Shelf" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html: htmlContent,
  });
};

module.exports = sendEmail;