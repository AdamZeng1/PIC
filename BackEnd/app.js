require("babel-core/register");
require("babel-polyfill");
// express-derouter必备
require('babel-register');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config/config');
const mongoose = require('mongoose');
const morgan = require('morgan');
const user = require('./routes/UserRoute');
const topic = require('./routes/TopicRoute');
const post = require('./routes/PostRoute');
const comment = require('./routes/CommentRoute');
const secondComment = require('./routes/SecondCommentRoute');
const qiniuToken = require('./routes/Qiniu');


app.use("*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    if (req.method === "OPTIONS") {
        res.send(200)
    } else {
        next()
    }
});


app.use(morgan('dev'));


app.use(bodyParser.urlencoded({extended: false}));


app.use(bodyParser.json());

/**
 * all routes register here
 */
app.use('/user', user);
app.use('/topic', topic);
app.use('/post', post);
app.use('/posts', comment);
app.use('/posts', secondComment);
app.use('/qiniu',qiniuToken);
app.use('/health-check', (req, res) => res.send("Healthy"))
/**
 * connect to MongoDB
 */

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${config.mongo_host}:${config.mongo_port}/${config.mongo_database}`, {useNewUrlParser: true});



app.listen(config.port, () => console.log(`Server started on port ${config.port}`));
