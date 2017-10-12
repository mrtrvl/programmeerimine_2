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

// Postituse lisamise vaade
router.get('/posts/add', (req: any, res: any) => {
    res.render('pages/add-post')
});

//Postituse lisamine
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
            res.redirect('/posts/add');
        } else {
            res.redirect('/posts');
        }
    });
});

// Üksiku postituse vaade
router.get('/post/:id', (req: any, res: any) => {
    let postId = req.params.id;
    Post.findOne({_id: postId}).exec((err: any, post: any) => {
        if (err) {
            console.log(err);
            res.redirect('/posts');
        } else {
            res.locals.post = post;
            res.render('pages/single-post');
        }
    });
});

// Postituse muutmise vaade
router.get('/post/:id/edit', (req: any, res: any) => {
    let postId = req.params.id;
    Post.findOne({_id: postId}).exec((err: any, post: any) => {
        if (err) {
            console.log(err);
            res.redirect('/posts');
        } else {
            res.locals.post = post;
            res.render('pages/edit-post');
        }
    });
});

//Postituse muutmine
router.post('/post/:id/edit', (req: any, res: any) => {
    console.log(req.body);
    let post = {
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
    };

    let query = {_id: req.params.id};
    Post.update(query, post, (err:any) => {
        if (err) {
            console.log(err);
            res.redirect('/post/' + req.params.id + "/edit");
        } else {
            res.redirect('/post/' + req.params.id);
        }  
    });
});



// Üksiku postituse kustutamine
router.get('/post/:id/delete', (req: any, res: any) => {
    let postId = req.params.id;
    Post.findOne({_id: postId}).exec((err: any, post: any) => {
        if (err) {
            console.log(err);
            res.redirect('/posts');
        } else {
            res.locals.post = post;
            res.render('pages/single-post');
        }
    });
});

module.exports = router;


