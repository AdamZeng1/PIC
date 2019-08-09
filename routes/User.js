const {Router, Get, Post, Put, Delete, All, Custom} = require('express-derouter');

// using json web token do authority jon
const jwt = require('jsonwebtoken');


/**
 * @Router 直接确定上层路径,此类中书写的api均为/user/..., 如/user/login
 */
@Router("/users")
class UserController {
    @Get('/')
    get(req, res, next) {
        res.send('get /');
    }

    @Post('/')
    post(req, res, next) {
        res.send('post /'+req.body.name);
    }

    /**
     * 通过此方法获取到json web token, 用户信息来源为POST表单提交的数据
     * 关于json web token的原理请访问 https://juejin.im/post/5b06c6baf265da0db4791805
     */
    @Post('/login')
    login(req, res) {
        const username = req.body.name;
        const password = req.body.password;
        const email = req.body.email;

        const user = {
            username: username,
            password: password,
            email: email
        };

        const {secretKey} = require('../constant/constant');
        // 使用jwt并利用表单提交数据生成一个token,expiresIn为token失效时间
        jwt.sign({user}, secretKey, {expiresIn: '10000s'}, (err, token) => {
            res.json({
                success: true,
                message: 'success',
                token: token
            });
        });
    }
}


module.exports = UserController;


