const nodemailer = require("nodemailer");
const dotenv = require ("dotenv");
dotenv.config()

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
    },
  });


  function sendMail(toEmail, subject, content){
    const mailOptions = {
        from: "krishnamk2604@gmail.com",
        to: toEmail,
        subject: subject,
        html:content,
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log("error occured", error)
        }
        else{
            console.log("Email send:", info.response)
        }
    })
  }

  module.exports={sendMail}