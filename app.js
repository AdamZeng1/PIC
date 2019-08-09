// express-derouter必备
require('babel-register');
const express = require('express');
// 启用文件路径path相关方法给予express-derouter使用
const path = require('path');
const app = express();
const jwtAuth = require('./middleware/jwt');
const bodyParser = require('body-parser');
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
 * 启用express-derouter,采用类似于SpringMVC的方式进行注解的路由写法
 */
require('express-derouter').register({
    app,
    routesDir: path.join(__dirname, 'routes') // 扫描jwt下的routes包中的所有路径
});


app.listen(5000, () => console.log('Server started on port 5000'));



