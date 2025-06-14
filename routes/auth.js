const router = require('express').Router();
const User = require('../models/User');

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// router.get('/', (req, res) => {
//     res.send('auth');
// });

module.exports = router;
