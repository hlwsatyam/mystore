// config/email.js
 
 
import nodemailer from 'nodemailer'

 
const transporter = nodemailer.createTransport({
  host:  "smtp.gmail.com",
  port: 465|| 465, // default secure port
  secure: true, // use SSL/TLS
  auth: {
    user: "satyampandit021@gmail.com",
    pass:  "hswk zxok jkaz dfpq",
  },
});

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter verification failed:", error);
  } else {
    console.log("✅ Email transporter verified and ready to send messages.");
  }
});

const sendEmail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("📧 Email sent successfully to:", mailOptions.to);
    return { success: true };
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    return { success: false, error };
  }
};

 export  default sendEmail;
