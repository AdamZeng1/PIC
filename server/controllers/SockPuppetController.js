const {queryAllStrangeUser} = require('../middleware/sockPuppets');
const {findStrangeUser} = require('../middleware/sockPuppets');


class SockPuppetController {
    async queryAllStrangeUsers(req, res) {
        const result = await queryAllStrangeUser();
        return res.status(200).json(result);
    }
}

module.exports = new SockPuppetController();
