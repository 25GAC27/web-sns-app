const router = require('express').Router();

// Register a new user
router.post('/register', (req, res) => {
    try {
    } catch (err) {
        return res.status(500).json(err);
    }
});

// router.get('/', (req, res) => {
//     res.send('users');
// });

module.exports = router;
