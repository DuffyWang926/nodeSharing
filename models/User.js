const db = require('../db');

module.exports = db.defineModel('users', {
    // userId:db.STRING(100),
    userId:db.STRING(30),
    email: {
        type: db.STRING(100),
        unique: true
    },
    password: db.STRING(20),
    nickName: db.STRING(40),
    // identity: db.STRING(100),
    // birth: db.STRING(10),
    createdAt: db.STRING(40),
    updatedAt: db.STRING(40),
    // version: db.BIGINT,
    gender: db.BIGINT
});
