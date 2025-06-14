const router = require('express').Router();
const User = require('../models/User');

// CRUD

// Read a user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        return res.status(500).json(err);
    }
});

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
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json('You can only delete your own account!');
    }
});

// Follow a user
router.put('/:id/follow', async (req, res) => {
    if (req.body.userId != req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            // Check if the user is already following
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({
                    $push: {
                        followers: req.body.userId,
                    },
                });
                await currentUser.updateOne({
                    $push: {
                        followings: req.params.id,
                    },
                });
                return res.status(200).json('User has been followed');
            } else {
                return res.status(403).json('You already follow this user');
            }
        } catch {
            return res.status(500).json(err);
        }
    } else {
        return res.status(500).json("You can't follow yourself!");
    }
});

module.exports = router;
