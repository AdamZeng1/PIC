const {Router, Get, Post, Put, Delete, All, Custom} = require('express-derouter');

// using json web token do authority jon
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const passport = require('passport');
const config = require('../config/config');
const bcrypt = require('bcrypt');
require('../passport/passport')(passport);

/**
 * @Router 直接确定上层路径,此类中书写的api均为/user/..., 如/user/login
 */
@Router("/users")
class UserController {

    /**
     * 通过在@Get()中注册authenticate中间件来拦截请求,对于非user的模块,建议写在@Router中直接拦截
     * @param req
     * @param res
     */
    @Get('/', passport.authenticate('bearer', {session: false}))
    get(req, res) {
        res.send('get /');
    }

    @Post('/', passport.authenticate('bearer', {session: false}))
    post(req, res) {
        res.send('post /' + req.body.name);
    }

    /**
     * 通过此方法获取到json web token, 用户信息来源为POST表单提交的数据
     * 关于json web token的原理请访问 https://juejin.im/post/5b06c6baf265da0db4791805
     */
    @Post('/login')
    async login(req, res) {
        const password = req.body.password;
        // const email = req.body.email;
        const username = req.body.username;
        /**
         * 根据用户名查找是否存在该用户
         */
        try {
            const user = await User.findOne({name: username});

            if (!user) return res.status(404).send({success: false, message: '认证失败,用户不存在!'});

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) return res.status(401).send({success: false, message: '认证失败,密码错误!'});

            const token = jwt.sign({name: user.name}, config.secret, {
                expiresIn: 10080 // token 过期销毁时间设置
            });

            user.token = token;

            const result = await User.update({name: username}, {
                    $set: {
                        token: token
                    }
                }
            );

            return res.status(200).send({
                success: true,
                message: '验证成功!',
                token: 'Bearer ' + token,
                name: user.name
            });

        } catch (err) {
            console.log(err);
        }
    }

    /**
     * 注册账户
     */
    @Post('/register')
    async register(req, res) {
        // 如果用户输入的用户名密码邮箱有一个不存在
        if (!req.body.username || !req.body.password || !req.body.email) {
            res.json({success: false, message: '请输入您的账号密码.'});
        } else {
            /**
             * 使用提交的email在MongoDB中寻找相应行
             */
            const result = await User.findOne({email: req.body.email}); //result will be the whole document that you find
            if (!result) res.status(400).json({
                success: false,
                error: 'the email has already been used'
            });
            /**
             * 在库中创建一个新用户
             */
            const newUser = new User({
                name: req.body.username,
                password: req.body.password,
                email: req.body.email
            });
            /**
             * 保存用户账号
             */
            newUser.save((err) => {
                if (err) {
                    return res.json({success: false, message: '注册失败!'});
                }
            });
            /**
             * 将产生的jwt用于发送email
             */
            const jwtToken = newUser.generateJwtToken();
            newUser.sendVerificationEmail(jwtToken);
            res.json({success: true, message: '成功创建新用户!'});
        }
    }

    /**
     * 注册过程中的邮箱验证服务
     */
    @Get('/verify_email/:username/:token')
    async verifyUserValidByEmail(req, res) {
        try {
            const user = jwt.verify(req.params.token, config.secret);
            await User.update({name: req.params.username}, {$set: {is_active: true}});
        } catch (err) {
            console.log(err);
        }
        return res.redirect(config.redirectUrl);
    }
}

module.exports = UserController;
