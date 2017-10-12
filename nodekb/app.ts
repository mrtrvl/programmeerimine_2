import * as express from 'express';
const app = express();
import mongoose = require('mongoose');

const indexRoutes = require('./controllers/index');
const infoRoutes = require('./controllers/info');
const articlesRoutes = require('./controllers/articles');

mongoose.connect('mongodb://localhost/prog2');
let db: any = mongoose.connection;
db.once('open', function() {
    console.log('Connected to database');
});

const path = require('path');

const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use('/', indexRoutes);
app.use('/server-info', infoRoutes);
app.use('/articles', articlesRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});