import * as express from 'express';
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

// Kõik postitused
router.get('/posts', (req: any, res: any) => {
    Post.find({}, (err: any, posts: any) => {
        if(err) {
            console.log(err);
            res.redirect('/error')
        } else {
            res.locals.posts = posts;
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
    let newPost = new Post ({
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
    });

    newPost.save((err: any) => {
        if (err) {
            console.log(err);
            res.redirect('/error');
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
            res.redirect('/error');
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
            res.redirect('/error');
        } else {
            res.locals.post = post;
            res.render('pages/edit-post');
        }
    });
});

//Postituse muutmine
router.post('/post/:id/edit', (req: any, res: any) => {
    let post = {
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
    };

    let query = {_id: req.params.id};
    Post.update(query, post, (err:any) => {
        if (err) {
            console.log(err);
            res.redirect('/posts');
        } else {
            res.redirect('/posts');
        }  
    });
});



// Üksiku postituse kustutamine
router.delete('/post/:id', (req: any, res: any) => {
    let postId = req.params.id;
    Post.findByIdAndRemove({_id: postId}, (err: any) => {
        if (err) {
            console.log(err);
            res.redirect('/error');
        } else {
            res.send('Success');
        }
    });
});

module.exports = router;


