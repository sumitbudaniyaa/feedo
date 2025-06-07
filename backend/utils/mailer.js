const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendWelcomeMail = async({to, name})=>{
    const mailOptions = {
        from: `${process.env.EMAIL_USER}`,
        to,
        subject: "Welcome to Feedo!",
        html:`
        <div style="padding: 1rem; border-radius: .5rem; border: 1px solid grey; font-family: "Poppins", sans-serif; background-color: white;">
  <table width="100%" style="text-align: center;">
    <tr>
      <td>
        <h2 style="margin-bottom: 0.5rem;">Hello ${name}</h2>
        <h3 style="margin: 0.5rem 0;">Welcome to Feedo</h3>
        <p style="max-width: 500px; margin: auto;">
          Your account has been successfully created. You can now log in to your dashboard, add menu items, and set up your QR code.
        </p>
      </td>
    </tr>
  </table>
</div>`
    }
return transporter.sendMail(mailOptions);
}

module.exports = { sendWelcomeMail };