const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  secure: false,
  port: 587,
  tls: {
    ciphers: "SSLv3",
  },
  auth: {
    user: "RentWheelsCorp@outlook.com",
    pass: "MomoKevinMax",
  },
});

const sendMail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email envoyé");
  } catch (err) {
    console.error("Erreur survenue dans lenvoi de mail" + err);
  }
};

module.exports = { sendMail };
