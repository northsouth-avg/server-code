const Sequelize = require('sequelize');

let adminSequelize = new Sequelize('code_online', 'root', '1782989', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    pool: {
        max: 20,
        min: 5,
        idle: 10000
    }
});
module.exports = adminSequelize;