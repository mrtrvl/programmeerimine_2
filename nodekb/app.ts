//import * as express from "express";
const express = require('express');
const app = express();

const indexRoutes = require('./controllers/index');
const infoRoutes = require('./controllers/info');
const articlesRoutes = require('./controllers/articles');

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