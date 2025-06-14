const router = require('express').Router();
const User = require('../models/User');

// CRUD

// Read a user

// Update a user
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json('User updated successfully');
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json('You can only update your own account!');
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        return res.status(500).json(err);
    }
});

// router.get('/', (req, res) => {
//     res.send('users');
// });

module.exports = router;
