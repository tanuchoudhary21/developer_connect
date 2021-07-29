const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();

require('../db/connection');
const User = require('../model/userSchema');

router.get('/', (req, res) => {
    res.send(`Welcome to home page`);
});

router.post('/register', async(req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword ) {
        return res.status(422).json({error: "please fill the feild properly "});
    }

    try {
        const userExist = await User.findOne({email: email});

        if (userExist) {
            return res.status(422).json({error: "Email already Exists"});
        } else if (password != cpassword) {
            return res.status(422).json({error: "Password are not matching"});
        }else {
            const user = new User({name, email, phone, work, password, cpassword});
            await user.save();
            res.status(201).json({message: "User registered successfully"});
        }
        
    } catch (err) {
        console.log(err);
    }
   
});


router.post('/signin', async(req, res) => {
    const {email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({error: "Please fill all the data field"});
    }

    try {
        const userLogin = await User.findOne({email: email});

        if(userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            const token = await userLogin.generateAuthToken();
            console.log(token);
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });
            if (isMatch) {
                return res.status(200).json({message: "You are logged in"});
            } else {
                return res.status(404).json({error: "Invalid Crendential"});
            }
        } else {
            return res.status(404).json({error: "Invalid Crendential"});
        }
        

    } catch (err) {
        console.log(err);
    }
    
});


// Using promises to post data to mongoDB Atlas
//  router.post('/register', (req, res) => {
//     const { name, email, phone, work, password, cpassword } = req.body;

//     if (!name || !email || !phone || !work || !password || !cpassword ) {
//         return res.status(422).json({error: "please fill the feild properly "});
//     }

//     // Added data to online database using Promises
//     User.findOne({email: email})
//         .then((userExist) => {
//             if (userExist) {
//                 return res.status(422).json({error: "Email already Exists"});
//             }

//             const user = new User({name, email, phone, work, password, cpassword});

//             user.save().then(() => {
//                 res.status(201).json({message: "User registered successfully"})
//             }).catch((err) => res.status(500).json({error: "Failed to register"}));

//         }).catch((err) => {console.log(err); });
// });

module.exports = router;

