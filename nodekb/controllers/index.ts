const express = require('express');
const router = express.Router();
let bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded 
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json 
router.use(bodyParser.json());

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
            //console.log(posts);
            //res.json(posts);
            res.render('pages/posts')
        }
    });
});

router.get('/posts/add', (req: any, res: any) => {
    res.render('pages/add-post')
});

router.post('/posts/add', (req: any, res: any) => {
    console.log(req.body);
    let newPost = new Post ({
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
    });

    newPost.save((err: any) => {
        if (err) {
            console.log(err);
            res.redirect('/posts');
        } else {
            res.redirect('/posts');
        }
    });
});

module.exports = router;


