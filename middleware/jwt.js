/**
 *  token中间件
 */
const expressJwt = require('express-jwt');
const {secretKey} = require('../constant/constant');

/**
 * express-jwt中间件帮我们自动做了token的验证以及错误处理，
 * 所以一般情况下我们按照格式书写就没问题，
 * 其中unless放的就是你想要不检验token的api。(不检测的API现在放了两个/user/login /user/register)
 * 上述两个api不拦截因为注册和登录不需要token验证
 */
const jwtAuth = expressJwt({secret: secretKey}).unless({path: ["/user/login", "user/register"]});


/**
 * 该组件放在所有请求入口处,bodyParser的后面
 */
module.exports = jwtAuth;

