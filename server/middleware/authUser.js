const jwt = require('jsonwebtoken');
const config = require('../config/config');


class Auth {
    async authAdmin(req, res, next) {
        let token = req.header('Authorization');
        if (!token) res.status(401).send("Unauthenticated User");
        token = token.substring(14, token.length); // get the token string
        try {
            const encoded = await jwt.verify(token, config.adminSecret);
            req.user = encoded;
            next();
        } catch (err) {
            return res.status(401).send(err)
        }
    }

    async authUser(req, res, next) {
        let token = req.header('Authorization');
        if (!token) return res.status(401).send("Unauthenticated User");
        token = token.substring(7, token.length); // get the token string
        try {
            const encoded = await jwt.verify(token, config.secret);
            req.user = encoded;
            next();
        } catch (err) {
            return res.status(401).send(err);
        }
    }
}

module.exports = new Auth();
