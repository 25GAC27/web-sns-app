const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');

// make a post
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        return res.status(200).json(savedPost);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// update a post
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({
                $set: req.body,
            });
            return res.status(200).json('Post updated successfully');
        } else {
            return res.status(403).json('You can only update your own posts!');
        }
    } catch (err) {
        return res.status(403).json(err);
    }
});

// delete a post
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            return res.status(200).json('Post deleted successfully');
        } else {
            return res.status(403).json('You can only delete your own posts!');
        }
    } catch (err) {
        return res.status(403).json(err);
    }
});

// get a post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    } catch (err) {
        return res.status(403).json(err);
    }
});

// like a post
router.put('/:id/like', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if the user has already liked the post
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({
                $push: {
                    likes: req.body.userId,
                },
            });
            return res.status(200).json('Post liked successfully');
        } else {
            // If the user has already liked the post, remove the like
            await post.updateOne({
                $pull: {
                    likes: req.body.userId,
                },
            });
            return res.status(200).json('Post unliked successfully');
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

// get timeline posts
router.get('./timeline/all', async (req, res) => {
    try {
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        // Get posts from friends
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        return res.status(200).json(userPosts.concat(...friendPosts));
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;
