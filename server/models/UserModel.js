const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const config = require('../config/config');
const sgMail = require('@sendgrid/mail');
const fs = require('fs');
const hdb = require('handlebars');
// const template = fs.readFileSync('views/email.handlebars', "utf-8");
const template = fs.readFileSync(__dirname+'/../views/email.handlebars', "utf-8");
const compiledTemplate = hdb.compile(template);
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    name: {
        type: String,
        unique: true, // 不可重复约束
        require: true // 不可为空约束
    },
    password: {
        type: String,
        require: true // 不可为空约束
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    is_active: {
        type: Boolean,
        default: false
    },
    is_admin: {
        type: Boolean,
        require: true
    }
});

/**
 * bcrypt the password of user
 */
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            /**
             * 回调函数中的hash参数为用户的密码hash之后的结果
             */
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                /**
                 * 成功对密码进行hash之后保存在user.password中,并使用next()进去其他流程
                 */
                user.password = hash;
                next();
            });
        });
    }
});


/**
 * 校验用户输入密码是否正确
 * @param password 传入的待比较的密码
 * @param callback 传入的回调函数
 */
UserSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    })
};

/**
 * 根据username与email生成该user注册时的json web token
 *
 * @return {*}
 */
UserSchema.methods.generateJwtToken = function () {
    const jwtToken = jwt.sign({
        username: this.name,
        email: this.email
    }, config.secret, {expiresIn: config.email_expireTime});
    return jwtToken;
};

/**
 * using jwt sending email
 *
 * @param jwtToken
 */
UserSchema.methods.sendVerificationEmail = function (jwtToken) {
    sgMail.setApiKey(config.apiKey);
    const msg = {
        to: this.email,
        from: config.email_from,
        subject: config.email_subject,
        html: compiledTemplate({
            username: this.name,
            token: jwtToken,
            url: config.url
        })
    };
    sgMail.send(msg);
};

module.exports = mongoose.model('User', UserSchema);





