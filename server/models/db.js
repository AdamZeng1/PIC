const mongoose = require('mongoose');
const config = require('../config/config');
const Mockgoose = require('mockgoose').Mockgoose;

function connect() {
    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV === "test") {
            const mockgoose = new Mockgoose(mongoose);

            /** get information defined in model */
            mockgoose.prepareStorage()
                .then(() => {
                    mongoose.connect(`mongodb://${config.mongo_host}:${config.mongo_port}/${config.mongo_database}`,
                        {useNewUrlParser: true}).then((res, err) => {
                        if (err) return reject(err);
                        resolve();
                    });
                });
        } else {
            mongoose.connect(`mongodb://${config.mongo_host}:${config.mongo_port}/${config.mongo_database}`,
                {useNewUrlParser: true}).then((res, err) => {
                if (err) return reject(err);
                resolve();
            });
        }
    });
}

function close() {
    return mongoose.disconnect();
}

module.exports = {connect, close};


