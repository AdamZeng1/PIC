const mongoose = require('mongoose');
const config = require('../config/config');

function connect() {
    return new Promise((resolve, reject) => {
        mongoose.connect(`mongodb://${config.mongo_host}:${config.mongo_port}/${config.mongo_database}`,
            {useNewUrlParser: true}).then((res, err) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

function close() {
    return mongoose.disconnect();
}

module.exports = {connect, close};


