const router = require('express').Router();
const Post = require('../models/Post');

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

module.exports = router;
