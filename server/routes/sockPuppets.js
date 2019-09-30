const express = require('express');
const router = express.Router();

router.get("/", async (req, res) => {
    const result =
    res.status(200).json({ "qiniu-token": uploadToken });
});

module.exports = router;
