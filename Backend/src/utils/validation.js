const validator = require('validator')
const validateSignupData = (req)=>{
    const {firstName , lastName , emailId , password} = req.body;

    if(!firstName){
        throw new Error("Name is not valid");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Not a valid imail");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Use a strong password");
    }
}

module.exports = {validateSignupData}