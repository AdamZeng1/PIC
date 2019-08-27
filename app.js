require("babel-core/register");
require("babel-polyfill");
// express-derouter必备
require('babel-register');
const express = require('express');
// 启用文件路径path相关方法给予express-derouter使用
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config/config');
const mongoose = require('mongoose');
const morgan = require('morgan');
const user = require('./routes/UserRoute');
const topic = require('./routes/TopicRoute');
const post = require('./routes/PostRoute');
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
 * 初始化passport模块
 */
app.use(passport.initialize());

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
app.use('/post',post);
/**
 * 连接MongoDB数据库
 */
mongoose.Promise = global.Promise;
mongoose.connect(config.database, {useNewUrlParser: true}); // 连接数据库


/**
 * 启用express-derouter,采用类似于SpringMVC的方式进行注解的路由写法
 */
// require('express-derouter').register({
//     app,
//     routesDir: path.join(__dirname, 'routes') // 扫描jwt下的routes包中的所有路径
// });


app.listen(4000, () => console.log('Server started on port 4000'));
