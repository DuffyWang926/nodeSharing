const db = require('../db');

module.exports = db.defineModel('city', {
    name: db.STRING(100),
    pid: db.STRING(50),
});
