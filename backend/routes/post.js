const express = require('express');
const router = express.Router();
const multer = require('multer');

const { Post } = require('../models/Post');

var storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
})

var upload = multer({ storage: storage }).single('file');

router.post('/uploadImage', (req, res) => {
    upload(req, res, (err) => {
        let filePath = res.req.file.path.replace(/\\/g, '/');
        if (err)
            return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, filePath: filePath, filename: res.req.file.path });
    })
});

router.post('/uploadPost', (req, res) => {
    const post = new Post(req.body);

    post.save((err) => {
        if (err)
            return res.status(400).json({ success: false });
        return res.status(200).json({ success: true });
    })
})

router.get('/getPosts', (req, res) => {
    Post.find()
        .sort({ 'createdAt': -1 })
        .populate('writer')
        .exec((err, posts) => {
            if (err)
                return res.status(400).json({ success: false });
            return res.status(200).json({ success: true, posts });
        })
})

router.post('/getPost', (req, res) => {
    Post.findOne({ '_id': req.body.postId })
        .populate('writer')
        .exec((err, post) => {
            if (err)
                return res.status(400).send(err);
            return res.status(200).json({ success: true, post });
        })
})

router.post('/deletePost', (req, res) => {
    Post.findOneAndDelete({ '_id': req.body.postId })
        .exec((err, done) => {
            if (err)
                return res.status(400).json({ success: false });
            return res.status(200).json({ success: true });
        })
})

module.exports = router;