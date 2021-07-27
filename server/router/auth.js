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
        }

        const user = new User({name, email, phone, work, password, cpassword});

        const userResigter = user.save();

        if (userResigter) {
            res.status(201).json({message: "User registered successfully"});
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