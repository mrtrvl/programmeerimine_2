import * as express from 'express';
const router = express.Router();

let articles: any[] = [
    {
        id: 1,
        title: 'Article one',
        author: 'John Doe',
        body: 'Article one body'
    },
    {
        id: 2,
        title: 'Article two',
        author: 'Jane Doe',
        body: 'Article two body'
    },
    {
        id: 3,
        title: 'Article three',
        author: 'John Doe',
        body: 'Article three body'
    },
    {
        id: 4,
        title: 'Article four',
        author: 'John Doe',
        body: 'Article four body'
    },
]

router.get('/', (req: any, res: any) => {
    res.locals.articles = articles;
    res.render('pages/articles');
})

module.exports = router;