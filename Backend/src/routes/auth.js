const express = require('express')
const User = require('../models/users');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

authRouter.post("/signup", async (req, res) => {
    try {
        const { firstName, emailId, password } = req.body

        const passwordHash = await bcrypt.hash(password, 10);

        // creating a new user
        const user = new User({
            firstName,
            emailId,
            password: passwordHash
        });

        const savedUser = await user.save();
        res.status(200).json({ message: "User added Successfully", data: savedUser })
    }
    catch (err) {
        res.status(400).send(`Error saving the user: ${err.message}`);
    }
});


authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        // Compare hashed password directly using bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            const token = jwt.sign({ _id: user._id }, 'datazapp@1123', {
                expiresIn: "1d"
            });

            res.cookie("token", token);
            return res.status(200).json({message: "Logged In Successfully" , user});
        } else {
            return res.status(401).json({ message: "Invalid Credentials" });
        }
    }
    catch (err) {
        res.status(400).send("Error : " + err.message);
    }
});


authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now())
    })

    res.status(200).json({message:"Logged Out Successfully"});
})

module.exports = authRouter