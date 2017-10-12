const express = require('express');
const router = express.Router();

const Post = require('../models/post');

router.get('/', (req: any, res: any) => {
    res.render('pages/index');
});


router.get('/posts', (req: any, res: any) => {
    Post.find({}, (err: any, posts: any) => {
        if(err) {
            console.log(err);
        } else {
            res.locals.posts = posts;
            console.log(posts);
            res.render('pages/posts')
        }
    });
});

module.exports = router;


