const express = require('express');
const router = express.Router();

const { Comment } = require('../models/Comment');

router.post('/postComment', (req, res) => {
    const comment = new Comment(req.body)

    comment.save((err, comment) => {
        if (err)
            return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true, comment });
    })
})

router.post('/getComment', (req, res) => {
    Comment.find({ 'postId': req.body.postId })
        .populate('writer')
        .exec((err, comments) => {
            if (err)
                return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, comments });
        })
})

module.exports = router;