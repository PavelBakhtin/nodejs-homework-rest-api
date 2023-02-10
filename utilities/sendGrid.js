const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();
const { SEND_GRID_KEY } = process.env;

const sendMail = async ({ email, subject, html }) => {
  try {
    sgMail.setApiKey(SEND_GRID_KEY);
    const message = {
      to: email,
      from: "pavelbakhtin88@gmail.com", // Use the email address or domain you verified above
      subject,
      html,
    };
    await sgMail.send(message);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { sendMail };
