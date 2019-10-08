var Redis = require("ioredis");
const config = require('../config/config');
var redis = new Redis({
    host: config.redis_host,
    port: config.redis_port,
    password: config.redis_password,
    db: 3
});

class verificationCodeCheck {
    async storeVerificationCode(username, verificationCode) {
        // set username:verificationCode in redis and expireTime is 300s
        await redis.pipeline()
            .set(username, verificationCode)
            .expire(username, 300)
            .exec();
    }

    async getVerificationCode(username) {
        const result = await redis.get(username);
        return result;
    }

    async generateVerificationCode(number) {
        let res = 0;
        let randomNumber;
        for (let i = 1; i <= number; i++) {
            randomNumber = Math.floor(Math.random() * 9 + 1);
            res += randomNumber;

            if (i < number) {
                res *= 10;
            }
        }
        return res;
    }
}

module.exports = new verificationCodeCheck();
