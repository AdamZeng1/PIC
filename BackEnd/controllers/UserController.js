const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

class UserController {
    async checkUserExist(req, res, next) {
        const user = User.find({_id: req.params.id});
        if (user) next();
        else return res.states(404).json({user: "not found"});
    }

    async find(req, res, next) {
        try {
            const {per_page = 10} = req.query;
            const page = Math.round(Math.max(req.query.page * 1, 1)) - 1;
            const perPage = Math.round(Math.max(req.query.per_page * 1, 1));
            const users = await User.find({name: new RegExp(req.query.username)})
                .limit(perPage)
                .skip(page * perPage);
            return res.status(200).json({success: true, users: users});
        } catch (e) {
            next(e);
        }
    }

    async findById(req, res) {
        const {fields = ""} = req.query;
        const selectFields = fields
            .split(";")
            .filter((f) => f)
            .map((f) => " +" + f)
            .join("");
        const user = await User.findById(req.params.id).select(selectFields);
        if (user) return res.status(200).json(user);
        return res.status(404).json({result: "can't find user whose userId = " + req.params.id});
    }

    async create(req, res) {
        const user = await new User({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password
        }).save();
        if (user) return res.status(200).json(user);
        return res.status(400).json({created: "fail to create new user"});
    }

    async update(req, res) {
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        if (user) return res.status(200).json(user); // 返回更新前的user
        return res.status(400).json({updated: false});
    }

    async register(req, res) {
        try {
            // 如果用户输入的用户名密码邮箱有一个不存在
            if (!req.body.username || !req.body.password || !req.body.email) {
                return res.json({success: false, message: 'please input your basic information.'});
            }
            /**
             * 使用提交的email在MongoDB中寻找相应行
             */
            const result = await User.findOne({email: req.body.email}); //result will be the whole document that you find

            if (result) {
                console.log(result);
                return res.status(409).json({
                    success: false,
                    error: 'the email has already been used'
                });
            }
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
            const user = await newUser.save();
            if (user !== newUser) {
                res.json({success: false, message: 'fail to create new user!'});
            } else {
                /**
                 * 将产生的jwt用于发送email
                 */
                const jwtToken = newUser.generateJwtToken();
                newUser.sendVerificationEmail(jwtToken);
                res.json({success: true, message: 'succeed to create new user!'});
            }
        } catch (e) {
            console.log(e);
        }
    }

    async login(req, res) {
        const password = req.body.password;
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

            // const result = await User.update({name: username}, {
            //         $set: {
            //             token: token
            //         }
            //     }
            // );

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

    async verifyEmail(req, res) {
        try {
            const user = jwt.verify(req.params.token, config.secret);
            await User.update({name: req.params.username}, {$set: {is_active: true}});
            return res.status(200).json({success: "verify email success!"});
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new UserController();


