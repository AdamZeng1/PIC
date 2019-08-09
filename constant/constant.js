// // 设置了密码盐值以及token的secretKey
const crypto = require('crypto');

/**
 * 该包提供jwt的secretKey常量,不进行硬编码
 *
 * @type {{MD5_SUFFIX: string, md5: (function(*=): string), secretKey: string}}
 */
module.exports = {
    MD5_SUFFIX: '我是一个固定长度的盐值',
    md5: (pwd) => {
        let md5 = crypto.createHash('md5');
        return md5.update(pwd).digest('hex');
    },
    secretKey: 'this_is_a_secretKey'
};




