const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(`Welcome to home page`);
});

router.post('/register', (req, res) => {
    console.log(req.body);
    res.json({message: req.body})
    // res.send("Register Page");
});

module.exports = router;