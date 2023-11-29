const express = require("express");
const { CheckUser } = require("../controllers/login");
const { InsertVerifyUser, InsertSignupUser } = require("../controllers/signin");
const router = express.Router();



router.get("/:token", async(req, res)=>{
    try {
        const response = await InsertSignupUser(req.params.token)
        res.status(200).send(response)
    } catch (error) {
      console.log(e)
      res.status(500).send( 
        `<html>
      <body>
          <h4> Registeration failed </h4>
          <p>Unexpected error happen...</p>
          <P>Regards</p>
          <p>Team</p>
      </body>
      </html>`) 
    }
});

router.post("/verify", async(req,res) =>{
    try {
        const{name,email,password} = await req.body;
        console.log(name, email, password);
        const registerCredential = await CheckUser(email);
        if(registerCredential===false){
            await InsertVerifyUser(name,email,password)
            res.status(200).send(true)
        }else if(registerCredential===true){
            res.status(200).send(false)
        }else if(registerCredential==="Server Busy"){
            res.status(500).send("Server Busy")
        }
    } catch (error) {
        
    }
});


module.exports=router;
