const User = require("../models/User")


async function CheckUser(email){
    try {
        const user = await User.findOne({email:email})
        if(user){
            return true
        }
        return false;
    } catch (error) {
        return "Server Busy"
    }
}

module.exports = {CheckUser}