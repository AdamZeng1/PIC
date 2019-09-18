var Redis = require("ioredis");
const config = require('../config/config');
var redis = new Redis({
    host: config.redis_host,
    port: config.redis_port,
    password: config.redis_password,
    db:5
});

// middleware for checking if the user is strange user or not
class SockPuppetsCheck {

    async findStrangeUser(username, ip) {
        let loginTime = new Date();
        let setWithSameIp = await redis.smembers(ip);

        // if no empty, there is user login in same ip within 5 minutes
        // if there is one and it is not username itself
        if (setWithSameIp.length !== 0 && !(setWithSameIp.length === 1 && setWithSameIp[0] === username)) {
            // store this in alertUser hash table
            await redis.hset("alertUser:" + username, "username", username);
            await redis.hset("alertUser:" + username, "ip", ip);
            await redis.hset("alertUser:" + username, "loginTime", loginTime);

            await redis.hset("user:" + username, "username", username);
            await redis.hset("user:" + username, "ip", ip);
            await redis.hset("user:" + username, "loginTime", loginTime);

            // save all user with same ip into alert hash table
            let len = setWithSameIp.length;
            for (let i = 0; i < len; i++) {
                let user = setWithSameIp[i];
                let tmpUsername = await redis.hget("user:" + user, "username");
                let tmpIp = await redis.hget("user:" + user, "ip");
                let tmpLoginTime = await redis.hget("user:" + user, "loginTime");
                // set all information into alert hash table
                await redis.hset("alertUser:" + user, "username", tmpUsername);
                await redis.hset("alertUser:" + user, "ip", tmpIp);
                await redis.hset("alertUser:" + user, "loginTime", tmpLoginTime);
            }
            // add this ip into set
            redis.sadd(ip, username);

        } else { // if empty, it means that you just add it to normal hash table
            await redis.sadd(ip, username);
            // after 5 minutes expire
            await redis.expire(ip, 300);

            let loginTime = new Date();
            // using hashSet store user information
            await redis.hset("user:" + username, "username", username);
            await redis.hset("user:" + username, "ip", ip);
            await redis.hset("user:" + username, "loginTime", loginTime.toString());
            await redis.expire("user:" + username, 500);
        }
    }
}


module.exports = new SockPuppetsCheck();
