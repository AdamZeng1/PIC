const app = require('./app');
const db = require('./models/db');
const config = require('./config/config');

db.connect()
    .then(()=>{
        app.listen(config.port, () => console.log(`Server started on port ${config.port}`));
    });

