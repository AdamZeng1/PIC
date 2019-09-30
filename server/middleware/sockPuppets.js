var Redis = require("ioredis");
const config = require('../config/config');
var redis = new Redis({
    host: config.redis_host,
    port: config.redis_port,
    password: config.redis_password,
    db: 4
});

// middleware for checking if the user is strange user or not
class SockPuppetsCheck {

    async queryAllStrangeUser() {
        let result = await redis.sort("idx:alertUser", "GET", "alertUser:*");
        result = result.map(JSON.parse);

        return result;
    }

    async findStrangeUser(username, ip) {
        let loginTime = new Date();
        let setWithSameIp = await redis.smembers(ip);

        await redis.incr("num");
        // if no empty, there is user login in same ip within 5 minutes
        // if there is one and it is not username itself
        if (setWithSameIp.length !== 0 && !(setWithSameIp.length === 1 && setWithSameIp[0] === username)) {
            const index = await redis.get("num");
            const strangeUser = {
                username: username,
                ip: ip,
                loginTime: loginTime
            };
            await redis.pipeline()
                .set("alertUser:" + index, JSON.stringify(strangeUser))
                .sadd("idx:alertUser", index)
                .set("user:" + index, JSON.stringify(strangeUser))
                .exec();

            // save all user with same ip into alert hash table
            let len = setWithSameIp.length;
            for (let i = 0; i < len; i++) {
                let user = setWithSameIp[i];
                const tmpPerson = await redis.get("user:" + index);
                await redis.pipeline()
                    .set("alertUser:" + index, tmpPerson)
                    .sadd("idx:alertUser", index)
                    .exec();

            }
            // add this ip into set
            await redis.sadd(ip, username);

        } else { // if empty, it means that you just add it to normal hash table
            await redis.pipeline()
                .sadd(ip, username)
                .expire(ip, 300)
                .exec();

            let loginTime = new Date();
            // using hashSet store user information
            const person = {
                username: username,
                ip: ip,
                loginTime: loginTime
            };
            const index = await redis.get("num");
            await redis.pipeline()
                .set("user:" + index, JSON.stringify(person))
                .expire("user:" + index, 500)
                .exec();
        }
    }
}


module.exports = new SockPuppetsCheck();
