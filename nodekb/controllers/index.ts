import * as express from 'express';
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const passport = require('passport');


// parse application/x-www-form-urlencoded 
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json 
router.use(bodyParser.json());

const Post = require('../models/post');
const User = require('../models/user');

const ensureAuthenticated = (req: any, res: any, next: any) => {
    if(req.isAuthenticated()) {
        return next();
    } else {
        req.flash('danger', 'Login!');
        return res.redirect('/login');
    }
};

router.get('/', (req: any, res: any) => {
    res.render('pages/index');
});

// login
router.get('/login', (req: any, res: any) => {
    res.render('pages/login');
});

router.post('/login', (req:any, res:any, next:any) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

// Kasutaja registreerimine
router.get('/register', (req: any, res: any) => {
    res.render('pages/register');
});

// logout
router.get('/logout', (req: any, res: any) => {
    req.logout();
    req.flash('success', 'You are logged out');
    return res.redirect('/');
});

router.post('/register', (req: any, res: any) => {
    let email = req.body.username;
    let password = req.body.password;
    let password2 = req.body.password2;

    let newUser = new User ({
        email: email,
        password: password
    });

    bcrypt.genSalt(10, (err: any, salt: any) => {
        bcrypt.hash(newUser.password, salt, (err: any, hash: any) => {
            if(err) {
                console.log(err);
                return res.redirect('/register');
            }
            newUser.password = hash;
            newUser.save((err: any)=> {
                if (err) {
                    console.log(err);
                    return res.render('/register');
                }
                return res.redirect('/login');
            });
        });
    });
});

// Kõik postitused
router.get('/posts', (req: any, res: any) => {
    Post.find({}).populate('author').exec((err: any, posts: any) => {
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
router.get('/posts/add', ensureAuthenticated, (req: any, res: any) => {
    res.render('pages/add-post')
});

//Postituse lisamine
router.post('/posts/add', (req: any, res: any) => {
    let newPost = new Post ({
        title: req.body.title,
        author: req.user._id,
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
    Post.findOne({_id: postId}).populate('author').exec((err: any, post: any) => {
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


