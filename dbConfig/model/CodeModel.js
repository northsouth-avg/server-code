const Sequelize = require('sequelize');

const adminSequelize = require('../config/config');

//定义AdminModel模型
const CodeModel = adminSequelize.define('code_res', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: Sequelize.STRING(255),
        allowNull: false,
        field: 'code'
    },
    results:{
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'results'
    }

},{
    freezeTableName:true,
    timestamps:false
});

module.exports = CodeModel;