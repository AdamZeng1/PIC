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
const redis = require("redis");
/**
 * 在这里过滤OPTIONS的请求,并返回有效结果
 */
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

/**
 *  命令行中显示程序运行日志,便于bug调试
 */
app.use(morgan('dev'));

/**
 * 解析所有请求体, 所有的访问的req对象添加一个body属性
 */
app.use(bodyParser.urlencoded({extended: false}));

/**
 * 调用bodyParser模块以便程序正确解析body传入值
 */
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
/**
 * connect to MongoDB
 */
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${config.mongo_host}:${config.mongo_port}/${config.mongo_database}`, {useNewUrlParser: true});


const redisClient = redis.createClient({
    host: config.redis_host,
    port: config.redis_port,
    password: config.redis_password
});


redisClient.set("string key", "string value", redis.print);


app.listen(config.port, () => console.log(`Server started on port ${config.port}`));
