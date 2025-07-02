const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

userSchema.methods.getJWT = async function () {

    const user = this;

    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    return token;
};

userSchema.methods.ValidatePassword = async function(passwordInputByUser){
    const user = this ;
    const passwordHash = user.password;
    const isPasswordValid = bcrypt.compare(passwordInputByUser, passwordHash);

    return isPasswordValid;
}
module.exports = mongoose.model("User", userSchema);
