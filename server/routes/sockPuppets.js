const express = require('express');
const router = express.Router();

const {queryAllStrangeUsers} = require('../controllers/SockPuppetController');
router.get("/", queryAllStrangeUsers);

module.exports = router;
