const User = require("../models/User")
const {sendMail}  = require ("./SendMail")
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")
const verifyUser = require("../models/verifyUser")
dotenv.config()



async function InsertVerifyUser(name,email,password){
    try {
        const salt = await bcrypt.genSalt(11)
        const hashedPassword = await bcrypt.hash(password, salt)
        const token = generateToken(email)

        const newUser = new verifyUser({
            name:name,
            email:email,
            password:hashedPassword,
            token:token
        })

        const activationLink = `http://localhost:8010/signin/${token}`
        const content = `<h4> hi, there </h4>
        <h5>Welcome to the app </h5>
        <p>Thank you for signing up. click on the below activation link</p>
        <a href="${activationLink}">Click Here</a>
        <P>Regards</p>
        <p>Team</p>`
        console.log(newUser)
        await newUser.save();
        sendMail(email,"VerifyUser", content)

    } catch (error) {
        console.log(error)
    }
}

function generateToken(email){
    const token = jwt.sign(email,process.env.signup_jwt)
    return token
}

async function InsertSignupUser(token){
   try {
    const userVerify =await verifyUser.findOne({token:token})
    if(userVerify){
        const newUser = new User ({
            name:userVerify.name,
            email:userVerify.email,
            password:userVerify.password,
            forgetPassword:{}
        })
        await newUser.save();
        await userVerify.deleteOne({token:token});
        const content = `<h3> Registeration successful </h3>
        <h5>Welcome to the app </h5>
        <p>You are successfully registered</p>
        <P>Regards</p>
        <p>Team</p>`
        sendMail(newUser.email,"Registeration successful", content)
        return `<h4> hi, there </h4>
        <h5>Welcome to the app </h5>
        <p>You are successfully registered</p>
        <P>Regards</p>
        <p>Team</p>`
    }
    return `<h4> Registeration failed </h4>
        <p>Link expired...</p>
        <P>Regards</p>
        <p>Team</p>`
   } catch (error) {
    console.log(error)
    return `<html>
    <body>
        <h4> Registeration failed </h4>
        <p>Unexpected error happen...</p>
        <P>Regards</p>
        <p>Team</p>
    </body>
    </html>`
   }
    
}

module.exports={InsertVerifyUser,InsertSignupUser}
