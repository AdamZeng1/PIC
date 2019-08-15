module.exports = {
    // used when we create and verify JSON Web Tokens of verifying email
    'secret': '这个是我们第一个secretKey',
    // 邮件失效时间
    "email_expireTime":'1d',
    // 设定邮件的发件人
    'email_from':'kingOfUniverse@greatest.com',
    // 设定邮件的标题
    'email_subject':'Verification Email',
    // 设定sendGrid服务的apikey
    'apiKey':'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',

    // MongoDB的地址
    'database': 'mongodb://localhost:27017/test',

    // 邮箱验证成功之后的重定向地址
    'redirectUrl':'http://localhost:5000/login',

    // 网站路径
    'url':'http://localhost:5000'
};


