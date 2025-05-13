// const nodemailer = require("nodemailer");

const { Contact } = require("../models");

const sendContactMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    await Contact.create({ name, email, subject, message });
    res.json({ message: "Message submitted successfully!" });
  } catch (err) {
    console.error("Error saving contact:", err);
    res.status(500).json({ message: "Failed to submit message" });
  }
};

// const sendContactMessage = async (req, res) => {
//   const { name, email, subject, message } = req.body;

//   try {
//     // Configure transporter for Gmail
//     const transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port: process.env.EMAIL_PORT,
//       secure: false,
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER, 
//         pass: process.env.EMAIL_PASS, 
//       },
//     });

//     // Email content
//     const mailOptions = {
//       from: email,
//       to: process.env.EMAIL_USER, 
//       subject: `Contact Form: ${subject}`,
//       text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
//     };

//     // Send email
//     await transporter.sendMail(mailOptions);

//     res.json({ message: "Message sent successfully!" });
//   } catch (err) {
//     console.error("Error sending email:", err);
//     res.status(500).json({ message: "Failed to send message" });
//   }
// };

module.exports = { sendContactMessage };