const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const {findStrangeUser} = require('../middleware/sockPuppets');
const Post = require('../models/PostModel');
const {storeVerificationCode, getVerificationCode, generateVerificationCode} = require('../middleware/verificationCode');


class UserController {
    async checkUserExist(req, res, next) {
        try {
            const user = User.find({_id: req.params.id});
            if (user) next();
            else return res.states(404).json({user: "not found"});
        } catch (e) {
            return res.status(404).json({user: "not found"});
        }
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
        if (user) return res.status(200).json(user); // return the old user
        return res.status(400).json({updated: false});
    }

    async register(req, res) {
        try {
            // If the username, password or email of the request is empty
            if (!req.body.username || !req.body.password || !req.body.email) {
                return res.status(401).json({success: false, message: 'please input your basic information.'});
            }
            /**
             * Find whether the email is repeated
             */
            let result = await User.findOne({email: req.body.email}); //result will be the whole document that you find

            if (result) {
                return res.status(409).json({
                    success: false,
                    error: 'the email has already been used'
                });
            }
            /**
             * Find whether the username is repeated
             * */
            const usernameExist = await User.findOne({name: req.body.username}); //result will be the whole document that you find

            if (usernameExist) {
                return res.status(409).json({
                    success: false,
                    error: 'the username has already been used'
                });
            }

            /**
             * Creat a new user account in Mongo DB
             */
            const newUser = new User({
                name: req.body.username,
                password: req.body.password,
                email: req.body.email
            });
            /**
             * Save the user account
             */
            const user = await newUser.save();
            if (user !== newUser) {
                res.json({success: false, message: 'fail to create new user!'});
            } else {
                /**
                 * Append the generated jwtoken to send email
                 */
                const jwtToken = newUser.generateJwtToken();
                newUser.sendVerificationEmail(jwtToken);
                res.json({success: true, message: 'succeed to create new user!'});
            }
        } catch (e) {
            console.log(e);
        }
    }

    async alterPassword(req, res) {
        const verificationCode = req.body.verificationCode;
        const password = req.body.password;
        const username = req.body.username;
        const oldVerificationCode = await getVerificationCode(username);
        if (oldVerificationCode !== verificationCode) {
            return res.status(403).json({success: false, message: "verificationCode error"});
        }
        console.log("hello world");

        var hash = bcrypt.hashSync(password, 10);
        const result = await User.findOneAndUpdate({name: username}, {password: hash});
        if (result) {
            return res.status(200).json({success: true, message: "alter password success"});
        } else {
            return res.status(403).json({success: false, message: "alter password failed"});
        }
    }

    async login(req, res) {
        const password = req.body.password.toString();
        const username = req.body.username.toString();
        /**
         * Find a user By user name
         */
        try {
            const user = await User.findOne({name: username});

            if (!user) return res.status(404).send({success: false, message: 'Error, the user name is inexistent'});

            if (!user.is_active) return res.status(404).send({
                success: false,
                message: 'Error, the user account is not active'
            });

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) return res.status(401).send({success: false, message: 'Error, the password is incorrect!'});

            var result = {
                success: true,
                message: 'login successfully!',
                // token: 'Bearer ' + token,
                name: user.name
            };
            var token;
            if (user.is_admin) { // administrator
                token = jwt.sign({name: user.name, id: user._id}, config.adminSecret, {
                    expiresIn: 10080 // token expire date setting
                });
                result.is_admin = true;
                result.token = 'Bearer ' + token;
                result.userId = user._id;
            } else { // normal user
                token = jwt.sign({name: user.name, id: user._id}, config.secret, {
                    expiresIn: 10080 // token expire date setting
                });
                result.token = 'Bearer ' + token;
                result.userId = user._id;
            }

            user.token = token;

            const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
            // add redis function detect sock puppets
            findStrangeUser(user.name, ip);

            return res.status(200).send(result);

        } catch (err) {
            console.log(err);
        }
    }

    async verifyEmail(req, res) {
        try {
            const user = jwt.verify(req.params.token, config.secret);
            await User.update({name: req.params.username}, {$set: {is_active: true}});
            // return res.status(200).json({success: "verify email successfully!"});
            return res.redirect(config.redirectUrl);
        } catch (err) {
            console.log(err);
        }
    }

    // async sendAlterPage(req, res) {
    //     try {
    //         const user = jwt.verify(req.params.token, config.secret);
    //         return res.redirect(config.alterPage);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    async checkUsernameAndEmailAndSendEmail(req, res) {
        const email = req.body.email;
        const username = req.body.username;
        const userDB = await User.findOne({name: username});
        if (!userDB) {
            return res.status(404).json({success: false, message: "user doesn't exist"});
        }
        const result = await User.find({email: email});

        if (!result) {
            return res.status(404).json({success: false, message: "email is not registered"});
        }

        const newUser = new User({
            name: username,
            email: email
        });

        const verificationCode = await generateVerificationCode(6);
        await storeVerificationCode(username, verificationCode);
        newUser.sendAlterPasswordEmail(verificationCode);

        return res.status(200).json({success: true, message: "alter password email is already sent"});

    }


    async findPopularUserByPostsNumber(req, res) {
        const {per_page = 5, page = 0} = req.query;
        const queryPage = Math.round(Math.max(page * 1, 1)) - 1;
        const perPage = Math.round(Math.max(per_page * 1, 1));
        const result = await Post.aggregate([
            {$group: {_id: '$post_owner', numberOfPosts: {$sum: 1}}},
            {
                $lookup: {
                    from: 'users',
                    localField: "_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {$sort: {numberOfPosts: -1}},
            {$limit: perPage},
            {$skip: queryPage * perPage}
        ]);
        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(400).json({status: "get popular users fail"});
        }
    }
}

module.exports = new UserController();
