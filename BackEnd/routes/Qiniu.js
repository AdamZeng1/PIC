const express = require('express');
const router = express.Router();
const qiniu = require("qiniu");

const accessKey = "T5tjcA9Ndp74hAzEEuXT4SeLhttKfKVgwgosoJXi";
const secretKey = "2xYkIijm6-0sJ2GuB9dnsVeKAUF3rrjefYB2B6KH";
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const bucket = "image_test";
const options = {
    scope: bucket,
    // callbackUrl: "http://localhost:3000",
    // callbackBodyType: "application/json",
    returnBody:
        '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
};
const putPolicy = new qiniu.rs.PutPolicy(options);

router.get("/token", (req, res) => {
    const uploadToken = putPolicy.uploadToken(mac);
    res.status(200).json({ "qiniu-token": uploadToken });
});

module.exports = router;
