const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const config = require('../config/config');
const sgMail = require('@sendgrid/mail');
const fs = require('fs');
const hdb = require('handlebars');
// const template = fs.readFileSync('views/email.handlebars', "utf-8");
const verifyTemplate = fs.readFileSync(__dirname + '/../views/email.handlebars', "utf-8");
const compiledTemplate = hdb.compile(verifyTemplate);
const alterPasswordTemplate = fs.readFileSync(__dirname + '/../views/emailAlterPassword.handlebars', "utf-8");
const compiledTemplateAlterPassword = hdb.compile(alterPasswordTemplate);
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    name: {
        type: String,
        unique: true, // can't be repeated
        require: true  // can't be empty
    },
    password: {
        type: String,
        require: true // can't be empty
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
    console.log(user);
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
 * compare the if the password is correct
 * @param password waiting comparing password
 * @param callback callback function
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
 * according to username and email generate json web token
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

UserSchema.methods.sendAlterPasswordEmail = function (verificationCode) {
    sgMail.setApiKey(config.apiKey);
    const msg = {
        to: this.email,
        from: config.email_from,
        subject: config.email_subject,
        html: compiledTemplateAlterPassword({
            username: this.name,
            verificationCode: verificationCode,
        })
    };
    sgMail.send(msg);
};

module.exports = mongoose.model('User', UserSchema);





