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
const redis = require("redis");

/**
 * // token验证模块
 * @type {Strategy}
 */
// const Strategy = require('passport-http-bearer').Strategy;

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
 * 启用jwtAuth机制,自动屏蔽掉不带有token的请求,并且排除/user/register /user/login
 * 保留注册,登录请求
 */
// app.use(jwtAuth);
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
/**
 * 连接MongoDB数据库
 */
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${config.mongo_host}:${config.mongo_port}/${config.mongo_database}`, {useNewUrlParser: true}); // 连接数据库


const redisClient = redis.createClient({
    host: config.redis_host,
    port: config.redis_port,
    password: config.redis_password
});


redisClient.set("string key", "string value", redis.print);



app.listen(config.port, () => console.log('Server started on port 3000'));
