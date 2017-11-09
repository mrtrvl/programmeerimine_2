import * as express from 'express';
const app = express();
import mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const indexRoutes = require('./controllers/index');
const infoRoutes = require('./controllers/info');
import { Response } from "express"
import { IGetUserAuthInfoRequest } from "./requestConfig"



mongoose.connect('mongodb://localhost/prog2');
let db: any = mongoose.connection;
db.once('open', function() {
    console.log('Connected to database');
});

const path = require('path');

app.use(session({
    secret: 'session secret',
    resave: true,
    saveUnitialized: true
}));

const port = 3000;

require ('./config/passport')(passport);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', (req: IGetUserAuthInfoRequest, res, next) => {
    res.locals.user = req.user || null;
    next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use('/', indexRoutes);
app.use('/server-info', infoRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});